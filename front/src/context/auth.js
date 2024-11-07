import { useState, createContext, useEffect } from "react";
import api from '../utils/api'

export const AuthContext = createContext({})

function AuthProvider({children}){
    const [user,setUser] = useState(null)
    const [loadingAuth,setLoadingAuth] = useState(false)
    const [loading,setLoading] = useState(true)
    
    useEffect(()=>{
        
        function loadStorage(){
            const storageUser = localStorage.getItem('login')
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }    
            setLoading(false)
        }

        loadStorage()
        
    },[])

    async function authUser(data){

        localStorage.setItem('login', JSON.stringify(data.token))
        window.location.href = '/user/rent'
    }

    async function login(user,rota){
        
        try {
            const data = await api.post(rota, user)
                .then((res) => { 
                    console.log("resposta do servidor: " + res.data.mensagem);
                    delete user.password
                    delete user.passwordConfirm
                    console.log(user)
                    setUser(user);
                    authUser(res.data);
                    console.log("estou aqui")
                    
                })
                .catch((err) => {
                    if (err.response && err.response.data) {
     
                        console.log("Mensagem de erro da API: " + err.response.data.mensagem);
                        return err.response.data.mensagem
                    } else {
                        console.log("Erro durante a requisição: ", err.message);
                        return err.message
                    }
                });
        
            
            return data
        } catch (error) {
            console.log("Erro capturado fora do try-catch da requisição: ", error);
            return error
        }
    }
    
    return(
        <AuthContext.Provider value={{signed: !!user, user, loading, login }} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider