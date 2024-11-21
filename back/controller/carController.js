const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest :'uploads/'})

router.post('/carRegister',upload.single('car'),(req,resp)=>{

})