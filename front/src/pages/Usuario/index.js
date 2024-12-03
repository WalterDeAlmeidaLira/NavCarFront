import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styles from './index_usuario.module.css'
import { Link } from "react-router-dom";
import Footer from "../layout/Footer";
import { AuthContext} from '../../context/auth'
import { useContext } from "react";


const Usuario = () => {
    const { logout } = useContext(AuthContext)
    const [pagamento, setPagamento] = useState([])
    const [user, setUser] = useState([])
    const [aluguel, setAluguel] = useState([])
    const [exibirUsuario, setExibirUsuario] = useState([])
    const [exibirCarros, setExibirCarros] = useState([])
    const [mostrar,setMostrar]= useState(null)
    const [image,setImage]= useState(null)
    const [nome,setNome]= useState(null)

    useEffect(() => {
        // Obter a URL atual
        const url = window.location.href.split('/')
        let idUser = url[url.length - 1]
        idUser = parseInt(idUser)
        const data = api.get(`user/${idUser}`)
            .then(resp => {

                setUser(prevState => [...prevState, resp.data.user])
            })
            .catch(erro => {
                console.log(erro);
            });



    }, [])

    useEffect(() => {
        if (user.length > 0) {
            const id = user[0].user_id
            console.log("id do usuario", id)
            const data2 = api.post(`car/exibir-pagamento`, { id })
                .then(resp => {
                    console.log('data', resp.data)
                    setPagamento(prevState => [...prevState, resp.data.pagamento])
                })
                .catch(erro => {
                    console.log(erro);
                });

        }


    }, [user])

    useEffect(() => {
        
        if (user.length > 1) {            
            const id = user[0].user_id
            api.get(`car/alugar/${id}`).then(resp => {
                console.log("resp aluguel ",resp.data.aluguel)
                const aluguelRetorno = resp.data.aluguel
                setAluguel(prevState => [...prevState, aluguelRetorno])
            }).catch(erro => {
                console.log(erro)
            })
        }
        console.log(user[0])

        if (user[0]) {
            const dadosExibir = {
                nome: user[0].user_name,
                email: user[0].user_email,
                doc: user[0].user_doc,
                imagem: user[0].user_profile,
            }

            setNome(user[0].user_name)


            if(exibirUsuario < 1){
                setExibirUsuario(prevState => [...prevState, dadosExibir])
            }



        }

    }, [user])

    function sair(){
        logout()
    }

    async function criarDados(){
        console.log('aluguel', aluguel)

        const calculateDaysDifference = (dateString) => {
            const targetDate = new Date(dateString); // Converter a string para um objeto Date
            const today = new Date(); // Data atual
        
            // Normalizar as datas para o mesmo horário (ignorar horas, minutos, etc.)
            const targetDateUTC = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
            const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
        
            // Calcular a diferença em milissegundos e converter para dias
            const differenceInMilliseconds = targetDateUTC - todayUTC;
            const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        
            return Math.ceil(differenceInDays); // Arredondar para cima
        };

        function formatDate(isoDate) {
            const date = new Date(isoDate);
          
            // Extrair dia, mês e ano
            const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
            const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth é zero-indexado
            const year = date.getFullYear();
          
            // Retornar no formato desejado
            return `${day}/${month}/${year}`;
          }
        const listaIdVeiculos = []
        
        aluguel[0].map(aluguel=>{
            listaIdVeiculos.push(aluguel.id_car)
        })
        console.log('cheguei aaquii')
        const listaCarros = []

        listaIdVeiculos.map(async (id,index) =>{
            if(exibirCarros.length < 1){
                const dt = await api.get(`car/exibirCarros/${id}`).then(resp=>{
                    let carro = resp.data.carro
                    console.log('carro ',carro[0])
                    if(aluguel[0][index].alugado == 0){
                        let inicio = aluguel[0][index].inicio_aluguel
                        let retirada =  aluguel[0][index].local_retirada
                        let data = aluguel[0][index].fim_aluguel
                        let diferenca = calculateDaysDifference(data)
                        if(diferenca < 0){
                            diferenca = 'Está atrasado'
                        }
                        let dataFim = formatDate(data)
                        let teste = {
                            modelo:  carro[0].modelo,
                            marca:  carro[0].marca,
                            imagem: carro[0].imagem,
                            inicio: inicio,
                            fim: dataFim,
                            local: retirada,
                            devolucao: diferenca
                        }
                        setExibirCarros(dd => [...dd,teste])
                    }
                })
            }
            
            
        })

        

    
        


        console.log('exibir carros',exibirCarros)
    }

    function mostrarCarros(e){
        if(mostrar == null){
            criarDados()
            setMostrar(1)
            e.target.innerText = 'ocultar'
        }else{
            setMostrar(null)
            e.target.innerText = 'Exibir Carros'
        }
    }

   function imagem(e){
        console.log(e.target.previousElementSibling)
        let label = e.target.previousElementSibling
        let arrayTexto = e.target.value.split('\\')
        let texto = arrayTexto[arrayTexto.length-1]
        console.log(arrayTexto)
        label.innerText = texto

        const arquivoSelecionado = e.target.files[0];        
        if (arquivoSelecionado) {
           
            const image = new File(
                [arquivoSelecionado],                
                arquivoSelecionado.name,             
                { type: arquivoSelecionado.type }    
            );
            setImage(image)
            console.log('Novo objeto File:', image);
        }
   }

   function changeName(e){
        setNome(e.target.value)
   }

   async function editar(){
        const id = user[0].user_id
        let usuario = {
            name: nome,
            image : image
        }

        if(usuario.name == '' && usuario.image == null){
            alert("voce não modificou nenhum dado!")
        }

        const formData = new FormData()
        formData.append('name',usuario.name) 
        formData.append('image',usuario.image)

        const data = await api.put(`user/update/${id}`,formData).then(resp=>{
            window.location.reload()
        }).catch(error=>{
            console.log('error', error)
        })

        


   }

    return (
        <div className="bg-gray-100 font-sans">
            {/* Navbar */}
            <nav className="bg-success p-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className={styles.button}><Link to="/user/rent" className={styles.link}>Alugar Veículo</Link></div>
                    <button className="btn btn-danger" onClick={sair}>Sair</button>
                </div>
            </nav>
            {/* Main Content */}
            <div className="container bg-white shadow-sm mt-5 p-5 d-flex">
                <div className="w-75 pe-5">
                    <h1 className="text-2xl font-bold text-green-700 mb-4">Dados Pessoais</h1>
                    {exibirUsuario.length > 0 ? (
                        exibirUsuario.map((dados,index) => (
                            <div key={index}> {/* Certifique-se de usar uma key única */}
                                <div className="col-md-6">
                                        <label className="form-label text-gray-700">Imagem</label>
                                        <div className="input-group">
                                            <img  className={styles.img} src={`http://127.0.0.1:3333/uploads/${dados.imagem}`}></img>
                                            
                                        </div>
                                        <div className={styles.input_dados}>
                                            <label htmlFor='file'>Clique aqui para alterar sua foto</label>
                                            <input id="file" onChange={imagem} type="file" className={styles.input} />

                                        </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label text-gray-700">Nome Completo</label>
                                        <div className="input-group">
                                            <input className="form-control" type="text" onChange={changeName} value={nome} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-gray-700">Email</label>
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                type="text"
    
                                                value={dados.email}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-gray-700">Documento</label>
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={dados.doc}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    ) : (<p>Erro ao carregar dados.</p>)}


                    <div className="text-end">
                        <button className={styles.btnSalvar} onClick={editar}>
                            SALVAR DADOS
                        </button>
                    </div>
                </div>

                {/* Carros Alugados */}
                <div>
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Carros Alugados</h2>
                    <button onClick={mostrarCarros} className={styles.btnList}>Exibir Carros</button>
                    {mostrar && exibirCarros.map((carro,i) => (
                        <div key={i} className="card mb-3">
                            <div className="card-body d-flex align-items-center">
                                <img
                                    alt="Imagem de um carro"
                                    className={styles.imgVeiculo}
                                    height="100"
                                    width="100"
                                    src={`http://127.0.0.1:3333/uploads/${carro.imagem}`}
                                />
                                <div>
                                    <p className="fw-bold text-gray-700">Carro {carro.modelo}</p>
                                    <p className="mb-0">Data de Entrega: {carro.fim}</p>
                                    <p className="mb-0">local da devolucção: {carro.local}</p>
                                    <p className="text-danger fw-bold">Faltam {carro.devolucao} dias</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer></Footer>
        </div>
    );
};

export default Usuario;
