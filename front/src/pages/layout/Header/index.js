import React, { useEffect, useState } from "react";
import styles from './index_header.module.css'
import { AuthContext} from '../../../context/auth'
import api from "../../../utils/api";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Header(){
    const { logout } = useContext(AuthContext)
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    
    useEffect(()=>{
        setToken(localStorage.getItem('login'))
        
    },[])

    const navigate = useNavigate()
    
    function sair(){
        logout()
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
        }else{
            console.log('Token não encontrado');
        }        
    }

    async function redirecionar(){
        let dataResp = await buscaUsuario(token)
            
        console.log("usuario ",dataResp.user.id)
        navigate(`/user/perfil/${dataResp.user.id}`)



    }

    return(
        <header className={styles.header}>
            <div className={styles.header_container}>
                <div className={styles.titulo_header}>nav car</div>
                <div>
                    <ul className={styles.lista_header}>                        
                        <li className={styles.item_header} onClick={redirecionar}>Usuário</li>
                        <li className={styles.item_header} onClick={sair}>Logout</li>
                    </ul>
                </div>

            </div>
        </header>
    )
}