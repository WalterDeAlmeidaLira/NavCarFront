const express = require('express')
const { createdUser, buscaUsuario } = require('../repository/userRepository')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validarCPF = require('../helpers/validadorCPF')
const validarCNPJ = require('../helpers/validadorCNPJ')

//PEGA USUARIO
router.get("/:idUser", (req, resp) => {
    const id = req.params.idUser
    resp.status(200).json({ msg: `usuario ${id}` })
})

router.post('/register', async (req, resp) => {
    
    resp.header()

    let user = {
        user_name: req.body.name,
        user_email: req.body.email,
        user_password: req.body.password,
        user_password_confirm: req.body.passwordConfirm,
        user_birthday: req.body.birthday,
        user_doc: req.body.doc,
        user_enterprise: req.body.enterprise,
        user_profile: req.body.image,
        user_admin: req.body.admin
    }

    if(!user.user_name || !user.user_email || !user.user_password || !user.user_password_confirm || !user.user_doc){
        return resp.status(401).json({mensagem: "faltou preencher algum campo obrigatório!"})
    }

    if( user.user_password == user.user_password_confirm){
        delete user.user_password_confirm        
    }else{
        return resp.status(401).json({mensagem: "A senha e a confirmação estão diferentes!"})
    }

    if(user.user_enterprise == 1){
        const validador = validarCNPJ(user.user_doc)
        if(!validador){
            return resp.status(401).json({mensagem: "cnpj inválido"})
        }
        
    }else{
        const validador = validarCPF(user.user_doc)
        if(!validador){
            return resp.status(401).json({
                mensagem: "cpf inválido!"
            })
        }
    }

    // criptografia da senha
    let password = user.user_password
    password = bcrypt.hashSync(password)
    user.user_password = password

    try{
        user = await createdUser(user)
    }catch(err){
        return res.status(401).json({erro: err,msg: "erro na criação do usuário!"})
    }

    if(user === 0 ){
        return resp.status(401).json({
            mensagem: "O email já foi cadastrado"
        })
    } 
    
    const token = jwt.sign({
        id: user.user_id,
        name: user.user_name,
        email: user.user_email
    },process.env.SECRET,{ expiresIn: '1h'})

    return resp.status(201).json({
        mensagem : " usuário cadastrado com sucesso!",
        token: token
    })
    
})

router.post('/login', async (req,resp)=>{
    let userBody = {
        email: req.body.email,
        password: req.body.password,
    }
    
    const user = await buscaUsuario(userBody.email)
    
    if(user.length == 0){
        return resp.status(401).json({
            mensagem: "Email ou senha incorretos!"
        })
    }

    let verify = bcrypt.compareSync(userBody.password, user[0].user_password)
        
    if(!verify) return resp.status(401).json({
        mensagem: "Email ou senha incorretos!"
    })

    const token = jwt.sign({
        id:user[0].user_id,
        name: user[0].user_name,
        email: user[0].user_email
    },process.env.SECRET,{ expiresIn: '1h'})

    return resp.status(200).json({token: token})

})

router.put('/update', (req, resp) => {
    resp.status(200).send("usuário atualizado!")
})

router.delete('/delete', (req, resp) => {
    resp.status(200).send('usuário deletado com sucesso!')
})

module.exports = router