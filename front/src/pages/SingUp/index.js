import { useState } from 'react'
import { Link } from 'react-router-dom'
import cadastro from '../../assets/cadastro.png'
import './index_register.css'

function SingUp() {

    const [doc, setDoc] = useState('CPF')

    function changeSelection(e) {
        const select = e.target.value
        setDoc(select)
    }

    return (
        <div className='container'>
            <div className='sub_container'>
                <div className='form'>
                    <form className='register'>
                        <h1>Cadastro</h1>
                        <select className='select' onChange={changeSelection}>
                            <option>Empresa ou Pessoa Física</option>
                            <option value="CPF">Pessoa Física</option>
                            <option value="CNPJ">Pessoa Jurídica</option>
                        </select>
                        <input type='text' id='name' placeholder='Nome'></input>
                        <input type='text' id='email' placeholder='Email'></input>
                        <input type='text' id='password' placeholder='senha'></input>
                        {doc === 'CPF' && (
                            <input type="text" id="CPF" placeholder="CPF" />
                        )}
                        {doc === 'CNPJ' && (
                            <input type="text" id="CNPJ" placeholder="CNPJ" />
                        )}
                        <button type='submit'>Próxima etapa</button>
                    </form>
                    <Link to='/login' className='link'>Já tenho cadastro</Link>
                </div>
                <div className='image'>
                    <img src={cadastro} alt='imagem de uma cidade' />
                </div>
            </div>
        </div>
    )
}

export default SingUp