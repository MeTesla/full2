import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState("")
    console.log(`${user} from Auth`);
    
    useEffect(()=>{
      const token = localStorage.getItem('token')
      if(token) setUser(token)
    },[]);
    
    const registerUser = async(userData)=>{
      const res = await fetch("http://localhost:3000/register",
        {
          method: "POST",
          headers :{"content-type" : "application/json"},
          body: JSON.stringify(userData)
        })
      const response = await res.json()
      if(response.token) {
        setUser(response.token)
        toast.success('Bienvenue dans ton espace')
        localStorage.setItem('token', response.token)    
      }else toast.error(response);
      
    }
    
    const loginUser = async(userData)=>{
      const res = await fetch("http://localhost:3000/login",
        {
          method: "POST",
          headers :{"content-type" : "application/json"},
          body: JSON.stringify(userData)
        })
      const response = await res.json()
      
      if(response.token) {
        setUser(response.token)
        toast.success("Vous êtes bien enregistreé");
        localStorage.setItem('token', response.token)      
      }else toast.error(response);;
      
      
    }

    return(
    <AuthContext.Provider value={{user, setUser, registerUser, loginUser}}>
      {children}
    </AuthContext.Provider>
    )
}