const express = require('express')
require('dotenv').config()
const app = express()
const PORT = 3333
const userController = require('./controller/userController')
const bodyParse = require('body-parser')
const cors = require('cors')

app.use(express.json())
app.use(bodyParse.urlencoded({ extended: false })) // apenas dados simples
app.use(bodyParse.json()) // apenas dados em json
app.use(cors({
    origin: 'http://localhost:3000',  // Permite que o frontend do localhost:3000 faça requisições
    credentials: true,               // Permite o envio de cookies se necessário
}));
// app.use((req, res, next) => {

//     //const allowedOrigins = ['https://dominio-confiavel.com', 'https://outro-dominio.com'];
//     // const origin = req.header('Origin');

//     // if (allowedOrigins.includes(origin)) {
//     //     res.header('Access-Control-Allow-Origin', origin);
//     // }

//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//         return res.status(200).send({
//             message: "ok"
//         })
//     }
//     next();
// });

app.use('/user', userController)

app.use((req, resp, next) => {
    const erro = new Error("Não encontrado!")
    erro.status = 404
    next(erro)
})

app.use((erro, req, resp, next) => {
    resp.status(erro.status || 500)
    return resp.send({
        erro: {
            message: erro.message
        }
    })
})

app.listen(PORT, () => {
    console.log('runing server!')
})