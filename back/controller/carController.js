const express = require('express');
const router = express.Router();
const { createdCar, exibirCar, atualizarAluguelCompra , buscaAluguelUnicoId,criarPagamento, criarAluguel,buscaAluguelId,buscaCarroId, buscaPagamentoId } = require('../repository/carRepository');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Diretório onde o arquivo será salvo
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
});

// Rota para cadastro do carro
router.post('/carRegister', upload.single('imagem'), (req, resp) => {
    // A verificação do erro de upload será feita automaticamente pelo Multer
    if (req.fileValidationError) {
        return resp.status(400).json({ mensagem: req.fileValidationError });
    }

    console.log('Arquivo recebido:', req.file);  // Verifique o arquivo
    console.log('Dados do corpo:', req.body);    // Verifique os dados

    const car = {
        modelo: req.body.modelo,
        marca: req.body.marca,
        ano: req.body.ano,
        cor: req.body.cor,
        cidade: req.body.cidade,
        estado: req.body.estado,
        imagem: req.file ? req.file.filename : null,  // Se não houver arquivo, atribui null
    };

    // Verifica se faltou algum campo
    if (!car.modelo || !car.marca || !car.ano || !car.cor || !car.cidade || !car.estado || !car.imagem) {
        return resp.status(401).json({ mensagem: "Faltou preencher algum campo obrigatório!" });
    }

    createdCar(car)
        .then(cadastro => {
            return resp.status(201).json({
                mensagem: "Carro cadastrado com sucesso",
                car: cadastro
            });
        })
        .catch(error => {
            console.error("Erro ao cadastrar carro:", error);
            return resp.status(500).json({ mensagem: "Erro ao cadastrar carro" });
        });
});

router.get('/exibirCarros', async (req, resp) => {
    const buscaCarros = await exibirCar()

    return resp.status(200).json({ carros: buscaCarros })
})

router.get('/exibirCarros/:id', async (req, resp) => {
    const id = req.params.id

    const carro = await buscaCarroId(id)

    return resp.status(200).json({ carro: carro })
})


function formatarDataParaMysql(dataISO) {
    return dayjs(dataISO).format('YYYY-MM-DD HH:mm:ss');
};

router.post('/alugar', async (req, resp) => {

    const aluguel = {
        id_car: req.body.aluguel.id_car,
        user_id: req.body.aluguel.user_id,
        inicio_aluguel: req.body.aluguel.inicio_aluguel,
        fim_aluguel: req.body.aluguel.fim_aluguel,
        local_retirada: req.body.aluguel.local_retirada,
        local_devolucao: req.body.aluguel.local_devolucao
    }
    const dataSql = formatarDataParaMysql(aluguel.inicio_aluguel)
    aluguel.inicio_aluguel=dataSql 
    console.log('data',dataSql)
    if(aluguel.fim_aluguel == ''){
        aluguel.fim_aluguel = null
    }

    console.log(aluguel)

    try {
        const resultado = await criarAluguel(aluguel)
        return resp.status(200).json({ resultado: resultado[0].insertId })
    } catch (error) {
        resp.status(401).json({ msg: error })
    }

})

router.post('/pagamento', async (req, resp) => {

    const pagamento = {
        numero_cartao: req.body.pagamento.numeroCartao,
        validade: req.body.pagamento.validade,
        cvv: req.body.pagamento.cvv,
        nome: req.body.pagamento.nome,
        id_aluguel: req.body.pagamento.aluguel,
        user_id: req.body.pagamento.userId,
        id_car: req.body.pagamento.idCar,
    }   

    try {
        const resultado = await criarPagamento(pagamento)
        
        return resp.status(200).json({ resultado: resultado[0].insertId })
    } catch (error) {
        return resp.status(400).json({ msg: error })
    }

})

router.post('/exibir-pagamento', async (req, resp) => {
    const id = req.body.id
    console.log('teste',id)
    const buscaPagamento = await buscaPagamentoId(id)

    return resp.status(200).json({ pagamento: buscaPagamento })
})

router.post('/extrair-token', (req, res) => {
    let token = req.body.token
    token = token.replace(/"/g, '')
    const decoded = jwt.decode(token);
    res.json({
        user: decoded
    });
});

router.get('/unico/alugar/:id', async (req, resp) => {
    console.log("entrei na rota unico")
    let id = req.params.id
    const aluguel = await buscaAluguelUnicoId(id)

    return resp.status(200).json({aluguel: aluguel})

});

router.get('/alugar/:id', async (req, resp) => {
    let id = req.params.id
    const aluguel = await buscaAluguelId(id)

    return resp.status(200).json({aluguel: aluguel})

});



router.post('/atualizar-aluguel/:id', async (req, resp) => {
    // Mapeamento dos campos do corpo da requisição para o objeto aluguel
    const aluguel = {
        id_aluguel: req.params.id,
        alugado: req.body.updateAluguel.alugado,
        fim_aluguel: req.body.updateAluguel.fim_aluguel,
        localDevolucao: req.body.updateAluguel.localDevolucao,
        limpeza: req.body.updateAluguel.limpeza,
        protecaoCarro: req.body.updateAluguel.protecaoCarro,
        protecaoAvarias: req.body.updateAluguel.protecaoAvarias,
        segurosTerceiros: req.body.updateAluguel.segurosTerceiros,
        condutorAdicional: req.body.updateAluguel.condutorAdicional,
        neutraliza: req.body.updateAluguel.neutraliza,
        preco: req.body.updateAluguel.preco
    };

    console.log(req.body)

    // Ajustes específicos (exemplo: data formatada)
    if (!aluguel.fim_aluguel) {
        aluguel.fim_aluguel = null; // Se vazio, definir como null
    }

    console.log(aluguel);

    try {
        // Chamada à função de atualização
        const result = await atualizarAluguelCompra(aluguel);

        // Responder com o resultado da operação
        return resp.status(200).json({ resultado: 'Aluguel atualizado com sucesso!' });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ msg: 'Erro ao atualizar o aluguel.', error });
    }
});



module.exports = router;
