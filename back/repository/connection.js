const mysql = require('mysql2/promise'); 

async function createConnection() {
    const pool = await mysql.createPool({ 
        user: "root",
        password: "W@lter58249001",
        database: "navcar",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    console.log("Conexão com BD realizada");
    return pool;
}


async function initDatabase() {
    const db = await createConnection();
    return db;
}


const db = initDatabase();

module.exports = db;