const db = require('./connection')


async function createdCar(car){
    const {
        modelo,
        marca,
        ano,
        cor,
        cidade,
        estado,
        imagem
    } = car

    console.log(imagem)

    const comando = `INSERT INTO car (modelo,marca,ano,cor,cidade,estado,imagem)
                     VALUES(?, ?, ?, ?, ?, ?, ?)`

    const connection = await db
    
    try{
        const resultado = connection.query(comando,[
            modelo,marca,ano,cor,cidade,estado,imagem
        ])

        car.id = resultado.insertId;
    }catch(erro){
        return erro
    }

    return car
}

async function exibirCar(){
    const connection = await db
    const comando = `SELECT * FROM car`

    const resultado = await connection.query(comando)

    return resultado[0]
}

async function criarAluguel(aluguel){
    const connection = await db
    const {
        id_car,
        user_id,
        inicio_aluguel,
        fim_aluguel,
        local_retirada,
        local_devolucao,
    } = aluguel

    const comando = `INSERT INTO aluguel(id_car,user_id,inicio_aluguel,fim_aluguel,local_retirada,local_devolucao)
                     VALUES(?, ?, ?, ?, ?, ?)`
    
    const resultado = connection.query(comando,[
        id_car,
        user_id,
        inicio_aluguel,
        fim_aluguel,
        local_retirada,
        local_devolucao
    ])

    return resultado
}

async function buscaAluguelId(id){
    const connection = await db
    const comando = `SELECT * FROM aluguel WHERE user_id=?`

    const resultado = await connection.query(comando,[id])

    return resultado[0]
}

async function buscaAluguelUnicoId(id){
    const connection = await db
    const comando = `SELECT * FROM aluguel WHERE id_aluguel=?`

    const resultado = await connection.query(comando,[id])

    return resultado[0]
}

async function buscaCarroId(id){
    const connection = await db
    const comando = `SELECT * FROM car WHERE id_car=?`

    const resultado = await connection.query(comando,[id])

    return resultado[0]
}

async function atualizarAluguelCompra(aluguel){
    const connection = await db
    const {
        id_aluguel,
        alugado,
        fim_aluguel,
        localDevolucao,
        limpeza,
        protecaoCarro,
        protecaoAvarias,
        segurosTerceiros,
        condutorAdicional,
        neutraliza,
        preco
    } = aluguel;
    
    // Comando SQL para o UPDATE
    const comando = `
        UPDATE aluguel
        SET 
            alugado = ?,
            fim_aluguel = ?,
            local_devolucao = ?,
            limpeza = ?,
            protecao_carro = ?,
            protecao_avarias = ?,
            seguro_terceiro = ?,
            condutor_adicional = ?,
            neutraliza = ?,
            preco = ?
        WHERE id_aluguel = ?`
    
    const resultado = await connection.query(comando, [
        alugado,
        fim_aluguel,
        localDevolucao,
        limpeza,
        protecaoCarro,
        protecaoAvarias,
        segurosTerceiros,
        condutorAdicional,
        neutraliza,
        preco,
        id_aluguel
    ]);
    
    return resultado;
}

async function criarPagamento(pagamento){
    const connection = await db
    let resultado
    const {
        numero_cartao,
        validade,
        cvv,
        nome,
        id_aluguel,
        user_id,
        id_car,
    } = pagamento
        
    const comando = `INSERT INTO pagamento(numero_cartao,validade,cvv,nome,id_aluguel,user_id,id_car)
                     VALUES(?, ?, ?, ?, ?, ?, ?)`

    
    try {
        resultado = await connection.query(comando,[        
            numero_cartao,
            validade,
            cvv,
            nome,
            id_aluguel,
            user_id,
            id_car,
        ])        
    } catch (error) {
        console.log(error)
        return error    
    }

    return resultado
}

async function buscaPagamentoId(id){
    const connection = await db
    const comando = `SELECT * FROM pagamento WHERE user_id = ?`
    let result
    try {
        result = await connection.query(comando,[id])
        return result[0]
    } catch (error) {
        console.log(error)
    }
    
}

module.exports={ createdCar, buscaAluguelUnicoId,exibirCar,buscaPagamentoId ,criarPagamento, criarAluguel,buscaAluguelId,buscaCarroId, atualizarAluguelCompra }