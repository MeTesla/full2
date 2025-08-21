import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/Auth"
function Protected (){
      const {user} = useContext(AuthContext) 

    return(
        <div>
            {user ? <Outlet /> : <Navigate to = '/login' />}
        </div>
    )
}

export default Protected