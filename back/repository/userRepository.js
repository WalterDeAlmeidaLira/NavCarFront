const db = require('./connection');

async function createdUser(user) {
    const { 
        user_name,
        user_email,
        user_password,
        user_birthday,
        user_doc,
        user_enterprise,
        user_profile,
        user_admin 
    } = user;

    const connection = await db;
    const cmd = `SELECT * FROM user WHERE user_email = ?`    
    const busca = await connection.query(cmd, [user_email])    
    

    if(!busca[0].length == 0){
        return 0
    }
    

    const comando = ` 
        INSERT INTO user (user_name, user_email, user_password, user_birthday, user_doc, user_enterprise, user_profile, user_admin)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
    `;

    try {
        const result = await connection.query(comando, [
            user_name,
            user_email,
            user_password,
            user_birthday,
            user_doc,
            user_enterprise,
            user_profile,
            user_admin 
        ]);
        
        
        user.id = result.insertId;
        console.log(result.insertId)
        console.log(result)

    } catch (error) {
        console.error("Erro na criação de usuário:", error);
        throw error
    }

    return user
}

async function buscaUsuario(email) {
    try{
        const connection = await db
        const comando = `SELECT * FROM user WHERE user_email = ?`
        const result = await connection.query(comando,[email])
        
        return result[0]
    }catch(e){
        return e
    }
}

module.exports = { createdUser,buscaUsuario }