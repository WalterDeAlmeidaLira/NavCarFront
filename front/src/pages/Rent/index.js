import React, { useEffect, useState } from "react";
import styles from './index_rent.module.css'
import Header from '../layout/Header'
import moeda from '../../assets/moeda.png'
import mobi from '../../assets/mobi.png'
import Footer from '../layout/Footer'
import api from '../../utils/api'
import { useNavigate } from "react-router-dom";
import { AuthContext} from '../../context/auth'


export default function Rent() {

    const navigate = useNavigate()
    
    

    const [card, setCard] = useState([])
    const [selecionar, setSelecionar] = useState('')
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')
    const [token, setToken] = useState('')

    const [today, setToday] = useState(() => {
        // Obtém a data atual no formato YYYY-MM-DD
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      });


    useEffect(() => {
        api.get('car/exibirCarros')
            .then(response => {
                setCard(response.data.carros);
            })
            .catch(error => {
                console.log(error)
            });

        setToken(localStorage.getItem('login'))
    }, [])

    async function submit(e) {
        let dataResp
        console.log('estou aqui')
        const id = e.target.id
        console.log(id)
        if (selecionar == '') {
            alert('Escolha o local da retirada!')
            return
        }
        if (hora == '') {
            alert('Escolha um horário')
            return
        }
        if (data == '') {
            alert('Escolha uma data')
            return
        }

        dataResp = await buscaUsuario(token)

        let user = dataResp.user
        const dataHora = `${data}T${hora}:00`
        const dataCompleta = new Date(dataHora)
        console.log('user ',user)
        console.log('data completa',dataHora)
        console.log('data completa',dataCompleta)

        let aluguel = {
            id_car: id,
            user_id: user.id,
            inicio_aluguel: dataCompleta,
            fim_aluguel: '',
            local_retirada: selecionar ,
            local_devolucao: selecionar
        }
        console.log("aluguel estopu aqui",aluguel)
        
        
        
        const cadastra = await api.post('car/alugar',{aluguel}).then(resp=>{
            let idAluguel = resp.data.resultado
            console.log("id aluguel",idAluguel)
            console.log("id aluguel",data)
            navigate(`/car/rent/${idAluguel}`)                    
        })
        



    }

    async function buscaUsuario(token){
        if (token) {
            try {
                const response = await api.post('car/extrair-token', { token });
                console.log('Resposta do servidor:', response.data);
                return response.data;
            } catch (error) {
                console.error('Erro na requisição:', error.response ? error.response.data : error.message);
            }
        } else {
            console.log('Token não encontrado');
        }        
    }

    function onChangeSelecionar(e) {
        const selecionar = e.target.value
        setSelecionar(selecionar)
    }

    function onChangeData(e) {
        const data = e.target.value
        setData(data)
    }

    function onChangeHora(e) {

        const selectedTime = e.target.value;
        const minTime = "08:00";
        const maxTime = "18:00";

        if (selectedTime < minTime || selectedTime > maxTime) {
            alert("O horário deve estar entre 08:00 e 18:00.");
            return;
        }

        let hora = e.target.value
        let ajustTime = hora.split(':')

        let subtracaoHora = ajustTime[0] - 3
        let horaComDoisDigitos = String(subtracaoHora).padStart(2, '0')
        let minutoDoisDigitos = String(ajustTime[1]).padStart(2, '0')

        hora = horaComDoisDigitos + ":" + minutoDoisDigitos
        console.log(hora)
        setHora(hora)
        
    }




    return (
        <div>
            <Header></Header>
            <div className={styles.banner_rent}>
                <div></div>
                <div className={styles.frase_efeito}>
                    <p>frase de efeito</p>
                    <p>"Fazer"</p>
                </div>
            </div>
            <form className={styles.form_rent}>
                <div className={styles.container_inputs}>
                    <div className={styles.conteudo_input_text}>
                        <div className={styles.div_input}>
                            <select className={styles.input} onChange={onChangeSelecionar}>
                                <option value="">Onde voce quer alugar?</option>
                                <option value="Centro Universitário Senac">Centro Universitário Senac</option>
                            </select>

                            <svg _ngcontent-serverApp-c158="" className={styles.svg} viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path _ngcontent-serverApp-c158="" fill-rule="evenodd" clip-rule="evenodd" d="M0 5.79457C0 2.59944 2.69158 0 6 0C9.30839 0 11.9999 2.59944 12 5.79457C12 9.75982 6.63059 15.581 6.40198 15.8269C6.18764 16.0575 5.81275 16.0579 5.59802 15.8269C5.36941 15.581 0 9.75982 0 5.79457ZM2.98128 5.79457C2.98128 7.40213 4.33545 8.70998 6 8.70998C7.66452 8.70998 9.01869 7.40217 9.01869 5.7946C9.01869 4.18704 7.66452 2.87919 6 2.87919C4.33548 2.87919 2.98128 4.18701 2.98128 5.79457Z" fill="#555"></path>
                            </svg>

                        </div>
                    </div>
                    <div className={styles.conteudo_input}>
                        <div className={styles.div_input}>
                            <input type="date" className={styles.input} min={today} onChange={onChangeData} />
                        </div>
                    </div>
                    <div className={styles.conteudo_input}>
                        <div className={styles.div_input}>
                            <input type="time" className={styles.input} onChange={onChangeHora} />
                        </div>
                    </div>
                </div>
                
            </form>
            <main className={styles.principal_rent}>
                <div className={styles.container_veiculos} >
                    <h3 className={styles.titulo_rent}>Grupo de Carros</h3>
                    <div className={styles.veiculos_rent}>

                        {card.map(carro => (

                            <div key={carro.id_car} className={styles.card_veiculo}>
                                <p>{carro.modelo}, {carro.marca} - {carro.ano}</p>
                                <img alt="veiculo" src={`http://127.0.0.1:3333/uploads/${carro.imagem}`} className={styles.veiculo_card}></img>
                                <button className={styles.botao_veiculos} id={carro.id_car} onClick={submit}>Reserve Agora</button>

                            </div>
                        ))}
                        {card.length == 0 && <h1>Não Há Veículos</h1>}
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}