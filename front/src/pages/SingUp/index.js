import { useState } from 'react'
import { Link } from 'react-router-dom'
import cadastro from '../../assets/cadastro.png'
import styles from './index_register.module.css'
import {  useContext } from 'react'
import { AuthContext} from '../../context/auth'
import olho from '../../assets/olho.png'
import olhoFechado from '../../assets/olho_fechado.png'


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
    const [olhoSenha,setOlhoSenha] = useState(false)

    function changeSelection(e) {
        const select = e.target.value
        setDocumento(select)
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

    function changeImage(e) {
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

    function changeAdmin(e){
        setAdmin(0)
        //console.log(admin)
    }

    async function submit(e){
        e.preventDefault()
        let user
        if(documento == 'CNPJ' ){
            user={
                name: name,
                email:email,
                password:password,
                passwordConfirm:passwordConfirm,
                birthday: birthday,
                doc:doc,
                enterprise:"1",
                image:image,
                admin:"0"
            }
        }else{
            user={
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
        }

        

        const formData = new FormData()
        formData.append('name',user.name) 
        formData.append('email',user.email) 
        formData.append('password',user.password) 
        formData.append('passwordConfirm',user.passwordConfirm) 
        formData.append('birthday',user.birthday) 
        formData.append('doc',user.doc) 
        formData.append('enterprise',user.enterprise) 
        formData.append('image',user.image) 
        formData.append('admin',user.admin) 
        
        const rota = '/user/register'
        const msg = await login(user,rota,formData)
        setMensagem(msg)

    }

    function limparMsg(e){
        setMensagem('')
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
    

    return (
        <div className={styles.container}>
            {mensagem && (            
                <div className={styles.aviso}><p>{mensagem}</p><button onClick={limparMsg}>OK</button></div>)
            }
            <div className={styles.sub_container}>
                <div className={styles.form}>
                    <form className={styles.register}>
                        <h1>Cadastro</h1>
                        {/* <select className={styles.select} onChange={changeSelection}>
                            <option value="CPF">Pessoa Júridica ou Pessoa Física</option>
                            <option value="CPF">Pessoa Física</option>
                            <option value="CNPJ">Pessoa Jurídica</option>
                        </select> */}
                        <input type='text' id='name' placeholder='Nome' required onChange={changeName} title='Digite seu nome'></input>
                        <input type='text' id='email' placeholder='Email' required onChange={changeEmail} title='Digite seu Email'></input>
                        {documento === 'CPF' && (
                            <input  type="text" placeholder="Digite sua data de nascimento dd/mm/aaaa" onfocus="(this.type='date')" onblur="(this.type='text')" required onChange={changeAniversario} title='Digite sua data de nascimento'></input>
                        )}
                        <div className={styles.borda_senha}>
                            <input type='password' id='password' min="10" className={styles.senha} placeholder='senha' required onChange={changePassword} title='Digite sua senha'></input>
                            <img src={olho} onClick={olhoAberto} className={`${styles.icones} ${styles.iconesOlho}`}/>
                            <img src={olhoFechado} onClick={olhoFechadoFuncao} className={`${styles.icones} ${styles.iconesFechado}`}/>
                        </div>
                        <div className={styles.borda_senha}>
                            <input type='password' id='password' className={styles.senha} min="10" placeholder='confirme a senha' required onChange={changeConfirPassword} title='Confirme sua senha'></input>
                            <img src={olho} onClick={olhoAberto} className={`${styles.icones} ${styles.iconesOlho}`}/>
                            <img src={olhoFechado} onClick={olhoFechadoFuncao} className={`${styles.icones} ${styles.iconesFechado}`}/>
                        </div>

                        
                        {documento === 'CPF' && (
                            <input type="text" id="CPF" placeholder="CPF" title='Digite seu cpf' required  onChange={changeDoc}/>
                        )}
                        {documento === 'CNPJ' && (
                            <input type="text" id="CNPJ" placeholder="CNPJ" required  title='Digite seu cnpj' onChange={changeDoc}/>
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