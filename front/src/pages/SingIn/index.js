import { Link } from 'react-router-dom'
import styles from './index_login.module.css'
import {  useContext, useState } from 'react'
import { AuthContext} from '../../context/auth'
import olho from '../../assets/olho.png'
import olhoFechado from '../../assets/olho_fechado.png'

function SingIn() {

    const { login } = useContext(AuthContext)

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [mensagem,setMensagem] = useState('')

    function changeEmail(e){
        setEmail(e.target.value)
    }

    function changePassword(e){
        setPassword(e.target.value)
    }

    async function enviar(e){
        e.preventDefault()
        const formData = {
            email: email,
            password: password
        }

        const user = {
            email: email,
            password: password
        }
        const rota = 'user/login'
        const data = await login(user,rota,formData)
        setMensagem(data)
    }

    function olhoAberto(e){
        
        e.target.style.display = "none"    
        e.target.nextElementSibling.style.display = 'inline-block'
        e.target.previousElementSibling.type = 'text'
            
        
    }

    function olhoFechadoFuncao(e){
        e.target.style.display = "none"    
        e.target.previousElementSibling.style.display = 'inline-block'
        e.target.previousElementSibling.previousElementSibling.type = 'password'
        
    }

    function limparMsg(e){
        setMensagem('')
    }

    return (
        <div className={styles.container_login}>
            {mensagem && (            
                <div className={styles.aviso}><p>{mensagem}</p><button onClick={limparMsg}>OK</button></div>)
            }
            <div className={styles.sub_container_login}>
                <h1 className={styles.title}>Iniciar sessão</h1>
                <form className={styles.formulario}>
                    <input type='text' placeholder='Email' title='Digite seu email' onChange={changeEmail} className={styles.input}></input>
                    <div className={styles.borda_senha}>
                        <input type='password' id='password' min="10" className={styles.senha} placeholder='senha' required onChange={changePassword} title='Digite sua senha'></input>
                        <img src={olho} onClick={olhoAberto} className={`${styles.icones} ${styles.iconesOlho}`}/>
                        <img src={olhoFechado} onClick={olhoFechadoFuncao} className={`${styles.icones} ${styles.iconesFechado}`}/>
                    </div>
                    <button type='submit' className={styles.button} onClick={enviar}>Entrar</button>
                </form>
                <Link to="/register" className={styles.link}>Não tem cadastro?</Link>
                <Link to="/" className={styles.link}>Voltar a página principal</Link>
            </div>
        </div>
    )
}

export default SingIn