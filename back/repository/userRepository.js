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
        
        console.log("no banoco",user)
        user.id = result[0].insertId
        return user

    } catch (error) {
        console.error("Erro na criação de usuário:", error);
        throw error
    }

    
}

async function atualizarUsuario(user,id){
    const { 
        user_name,
        user_email,
        user_password,
        user_birthday,
        user_doc,
        user_enterprise,
        user_profile,
        user_admin,
    } = user;
    try{
        const connection = await db;
        const cmd = `UPDATE user 
            SET user_name = ?,
            user_email = ?,
            user_password = ?,
            user_birthday = ?,
            user_doc = ?,
            user_enterprise = ?,
            user_profile = ?,
            user_admin = ?
            WHERE user_id = ?
            `    
        const update = await connection.query(cmd, [
            user_name,
            user_email,
            user_password,
            user_birthday,
            user_doc,
            user_enterprise,
            user_profile,
            user_admin,
            id
        ])

        return update[0]

    }catch(e){
        return e
    }


}

async function deletarUsuario(id){
    try{
        const connection = await db
        const comando = `DELETE FROM user WHERE user_id = ?`
        const result = await connection.query(comando,[id])        
        return result[0]
    }catch(e){
        return e
    }
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

async function buscaUsuarioId(id) {
    try{
        const connection = await db
        const comando = `SELECT * FROM user WHERE user_id = ?`
        const result = await connection.query(comando,[id])
        return result[0][0]
    }catch(e){
        console.log("esstou aqui no erro")
        return e
    }
}

module.exports = { createdUser,buscaUsuario, buscaUsuarioId, atualizarUsuario, deletarUsuario }