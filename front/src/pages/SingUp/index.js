import { useState } from 'react'
import { Link } from 'react-router-dom'
import cadastro from '../../assets/cadastro.png'
import styles from './index_register.module.css'
import {  useContext } from 'react'
import { AuthContext} from '../../context/auth'

import axios from 'axios'



function SingUp() {

    const { login } = useContext(AuthContext)

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')
    const [birthday,setBirthday] = useState('')
    const [doc,setDoc] = useState('')
    const [enterprise,setEnterprise] = useState('')
    const [image,setImage] = useState('')
    const [admin,setAdmin] = useState('')
    const [documento, setDocumento] = useState('CPF')
    const [mensagem,setMensagem] = useState('')

    function changeSelection(e) {
        const select = e.target.value
        //setDocumento(select)
    }

    function changeName(e){
        setName(e.target.value)
        //console.log(name)
    }
    function changeEmail(e){
        setEmail(e.target.value)
        //console.log(email)
    }
    function changePassword(e){
        setPassword(e.target.value)
        //console.log(password)
    }
    function changeConfirPassword(e){
        setPasswordConfirm(e.target.value)
        //console.log(passwordConfirm)
    }
    function changeAniversario(e){
        setBirthday(e.target.value)
        //console.log(birthday)
    }

    function changeDoc(e){
        setDoc(e.target.value)
        //console.log(doc)
    }

    function changeEnterprise(e){
        setEnterprise(0)
        //console.log(enterprise)
    }

    function changeImage(e){
        setImage(e.target.value)
        //console.log(image)
    }

    function changeAdmin(e){
        setAdmin(0)
        //console.log(admin)
    }

    async function submit(e){
        e.preventDefault()
        
        const user={
            name: name,
            email:email,
            password:password,
            passwordConfirm:passwordConfirm,
            birthday: birthday,
            doc:doc,
            enterprise:"0",
            image:image,
            admin:"0"
        }
        const rota = '/user/register'
        const msg = await login(user,rota)
        console.log(msg)
        setMensagem(msg)

    }

    function limparMsg(e){
        setMensagem('')
    }
    




    return (
        <div className={styles.container}>{mensagem && (            
                <div className={styles.aviso}><p>{mensagem}</p><button onClick={limparMsg}>OK</button></div>)
            }
            <div className={styles.sub_container}>
                <div className={styles.form}>
                    <form className={styles.register}>
                        <h1>Cadastro</h1>
                        <select className={styles.select} onChange={changeSelection}>
                            <option value="CPF">Empresa ou Pessoa Física</option>
                            <option value="CPF">Pessoa Física</option>
                            <option value="CNPJ">Pessoa Jurídica</option>
                        </select>
                        <input type='text' id='name' placeholder='Nome' required onChange={changeName}></input>
                        <input type='text' id='email' placeholder='Email' required onChange={changeEmail}></input>
                        <input type='date' id='data' placeholder='Data' required onChange={changeAniversario}></input>
                        <input type='text' id='password' placeholder='senha' required onChange={changePassword}></input>
                        <input type='text' id='password' placeholder='confirme a senha' required onChange={changeConfirPassword}></input>
                        {documento === 'CPF' && (
                            <input type="text" id="CPF" placeholder="CPF" required  onChange={changeDoc}/>
                        )}
                        {documento === 'CNPJ' && (
                            <input type="text" id="CNPJ" placeholder="CNPJ" required  onChange={changeDoc}/>
                        )}
                        <input type='file' id='image' onChange={changeImage} ></input>
                        <button type='submit' onClick={submit}>Próxima etapa</button>
                    </form>
                    <Link to='/login' className={styles.link}>Já tenho cadastro</Link>
                </div>
                <div className={styles.image_container}>
                    <img src={cadastro} className={styles.image} alt="imagem de uma cidade" />
                </div>
            </div>
        </div>
    )
}

export default SingUp