import { Link } from 'react-router-dom'
import styles from './index_login.module.css'

function SingIn() {
    return (
        <div className={styles.container_login}>
            <div className={styles.sub_container_login}>
                <h1 className={styles.title}>Iniciar sessão</h1>
                <form className={styles.formulario}>
                    <input type='text' placeholder='Email' className={styles.input}></input>
                    <input type='password' placeholder='Senha' className={styles.input}></input>
                    <label className={styles.checkbox_title}>
                        <input type='checkbox' className={styles.checkbox}></input>
                        lembrar-me
                    </label>
                    <Link to="/nao existe" className={styles.link}>Esqueci minha senha</Link>
                    <button type='submit' className={styles.button}>Entrar</button>
                </form>
                <Link to="/register" className={styles.link}>Não tem cadastro?</Link>
                <Link to="/register" className={styles.link}>Voltar a página principal</Link>
            </div>
        </div>
    )
}

export default SingIn