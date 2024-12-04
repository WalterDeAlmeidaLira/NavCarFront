const express = require('express')
const { createdUser, buscaUsuario,buscaUsuarioId,atualizarUsuario,deletarUsuario } = require('../repository/userRepository')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validarCPF = require('../helpers/validadorCPF')
const validarCNPJ = require('../helpers/validadorCNPJ')
const dayjs = require('dayjs');

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

    return resp.status(200).json({ user:user })
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
    console.log('teste', user)
    
    if(/[0-9]/.test(user.user_name)) {
        return resp.status(401).json({ mensagem: "O nome não pode ter números" });
    }
    
    if(/[!@#$%^&*(),.?":{}|<>]/.test(user.user_name)) {
        return resp.status(401).json({ mensagem: "O nome não pode ter caractere especial (!@#$%^&*(),.?\":{}|<>)" });
    }
    
    if(!user.user_name || !user.user_email || !user.user_password || !user.user_password_confirm || !user.user_doc){
        return resp.status(401).json({mensagem: "faltou preencher algum campo obrigatório!"})
    }

    if(/[A-Z]/.test(user.user_birthday)) {
        return resp.status(401).json({ mensagem: "A data de aniversário não deve conter letras" });
    }
    
    if(/[a-z]/.test(user.user_birthday)) {
        return resp.status(401).json({ mensagem: "A data de aniversário não deve conter letras" });
    }

    if(user.user_birthday.length < 10) {
        return resp.status(401).json({ mensagem: "foramto esperado dd/mm/aaaa" });
    }

    if(user.user_birthday){
        const today = dayjs() 
        const birth = dayjs(user.user_birthday,'DD/MM/YYYY'); 
        const age = today.diff(birth, 'year');
        console.log("data", user.user_birthday)
        console.log("idadea",age)
        console.log("ajsutada",birth)
        console.log("hj",today)
        if(age < 18){
            return resp.status(401).json({mensagem: "Voce deve ter mais de 18 anos para se cadastrar"})
        }
    }

    const [day, month, year] = user.user_birthday.split('/')
    const date = new Date(`${year}-${month}-${day}`)
    user.user_birthday = date

    if(user.user_password.length < 10) {
        return resp.status(401).json({ mensagem: "A senha deve ter pelo menos 10 caracteres" });
    }
    
    if(!/[A-Z]/.test(user.user_password)) {
        return resp.status(401).json({ mensagem: "A senha deve conter pelo menos uma letra maiúscula" });
    }
    
    if(!/[a-z]/.test(user.user_password)) {
        return resp.status(401).json({ mensagem: "A senha deve conter pelo menos uma letra minúscula" });
    }
    
    if(!/[0-9]/.test(user.user_password)) {
        return resp.status(401).json({ mensagem: "A senha deve conter pelo menos um número" });
    }
    
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(user.user_password)) {
        return resp.status(401).json({ mensagem: "A senha deve conter pelo menos um caractere especial (!@#$%^&*(),.?\":{}|<>)" });
    }
    
    if(/\s/.test(user.user_password)) {
        return resp.status(401).json({ mensagem: "A senha não pode conter espaços em branco" });
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
        console.log("id user",user)
    }catch(err){
        return res.status(401).json({erro: err,msg: "erro na criação do usuário!"})
    }

    if(user === 0 ){
        return resp.status(401).json({
            mensagem: "O email já foi cadastrado"
        })
    }    

    const token = jwt.sign({
        id: user.id,
        name: user.user_name,
        email: user.user_email
    },'token')

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
    
    console.log(userBody)
    const user = await buscaUsuario(userBody.email)
    
    if(user.length == 0){
        return resp.status(401).json({
            mensagem: "Email ou senha incorretos!"
        })
    } 

    let verify = bcrypt.compareSync(userBody.password, user[0].user_password)
    console.log('teste',verify)
    if(!verify) return resp.status(401).json({
        mensagem: "Email ou senha incorretos!"
    })

    console.log(user[0])

    const token = jwt.sign({
        id:user[0].user_id,
        name: user[0].user_name,
        email: user[0].user_email
    },'token')

    console.log(token)

    if (!token) {
        return resp.status(400).json({ message: "Erro ao gerar token" });
    }

    return resp.status(200).json({ token })

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

    console.log('imagem do udsuario ', req.file)

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