const express = require('express')
const { createdUser, buscaUsuario,buscaUsuarioId,atualizarUsuario,deletarUsuario } = require('../repository/userRepository')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validarCPF = require('../helpers/validadorCPF')
const validarCNPJ = require('../helpers/validadorCNPJ')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta de destino
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo
    }
});

const upload = multer({ storage: storage });

//PEGA USUARIO
router.get("/:idUser", async (req, resp) => {
    const id = req.params.idUser
    let user

    try{
        user = await buscaUsuarioId(id)
        
        if(user == 0){
            resp.status(404).json({msg:'Esse usuario não existe'})
        }else{
            delete user.user_password
        }
    }catch(e){
        
        return resp.status(404).json({ msg:'erro ao buscar usuário!'})
    }

    return resp.status(200).json({ user })
})

router.post('/register', upload.single('image'),async (req, resp) => {

    let user = {
        user_name: req.body.name,
        user_email: req.body.email,
        user_password: req.body.password,
        user_password_confirm: req.body.passwordConfirm,
        user_birthday: req.body.birthday,
        user_doc: req.body.doc,
        user_enterprise: req.body.enterprise,
        user_profile: req.file ? req.file.filename : null,
        user_admin: req.body.admin
    }

    console.log(user)

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

router.put('/update/:iduser',upload.single('image'), async (req, resp) => {
    let id = req.params.iduser
    let user
    let userUpdate = {
        user_name: req.body.name,
        user_email: req.body.email,
        user_birthday: req.body.birthday,
        user_doc: req.body.doc,
        user_enterprise: req.body.enterprise,
        user_profile: req.file ? req.file.filename : null,
    }

    try {
        user = await buscaUsuarioId(id)
    } catch (error) {
        return resp.status(404).json({msg:"Erro na atualização do usuário"})
    }
    console.log(req.body.name)

    if(userUpdate.user_name){
        console.log("estou no name")
        user.user_name = userUpdate.user_name
    }

    if(userUpdate.user_email){
        user.user_email = userUpdate.user_email
    }

    if(userUpdate.user_birthday){
        user.user_birthday = userUpdate.user_birthday
    }

    if(userUpdate.user_doc){
        user.user_doc = userUpdate.user_doc
    }

    if(userUpdate.user_enterprise){
        user.user_enterprise = userUpdate.user_enterprise
    }

    if(userUpdate.user_profile){
        user.user_profile = userUpdate.user_profile
    }


    try {
        const result = await atualizarUsuario(user,id)
        return resp.status(200).json({msg:"Usuário atualizado com sucesso!"})
    } catch (error) {
        return resp.status(404).json({msg:'erro no update'})
    }

})

router.delete('/delete/:userid', async(req, resp) => {
    const id = req.params.userid
    try {
        const result = await deletarUsuario(id)
        return resp.status(200).json({msg:"Usuário deletado com sucesso!"})
    } catch (error) {
        return resp.status(404).json({msg:'erro ao deletar usuario'})
    }

})

module.exports = router