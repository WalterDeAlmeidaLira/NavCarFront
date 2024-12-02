import { Link } from 'react-router-dom'
import styles from './index_login.module.css'
import {  useContext, useState } from 'react'
import { AuthContext} from '../../context/auth'

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
        const user = {
            email: email,
            password: password
        }
        const rota = 'user/login'
        const data = await login(user,rota)
        setMensagem(data)
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
                    <input type='password' placeholder='Senha' title='Digite sua senha' onChange={changePassword} className={styles.input}></input>
                    <label className={styles.checkbox_title}>
                        <input type='checkbox' className={styles.checkbox}></input>
                        lembrar-me
                    </label>
                    <Link to="/nao existe" className={styles.link}>Esqueci minha senha</Link>
                    <button type='submit' className={styles.button} onClick={enviar}>Entrar</button>
                </form>
                <Link to="/register" className={styles.link}>Não tem cadastro?</Link>
                <Link to="/" className={styles.link}>Voltar a página principal</Link>
            </div>
        </div>
    )
}

export default SingIn