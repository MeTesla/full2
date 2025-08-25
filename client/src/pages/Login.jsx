import { useRef, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/Auth"
import { ToastContainer } from "react-toastify"

function Login() {
    const formData = useRef(null)
    const {loginUser} = useContext(AuthContext)
    function handleFormData(e){
      e.preventDefault()
      const data = new FormData(formData.current)
      const mydata = Object.fromEntries(data)
      loginUser(mydata)      
    }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleFormData}
        ref={formData}
        className='login-form'>
        <input type="email" name="email" placeholder='Votre émail ...' />
        <input type="password" name="password" placeholder='Mot de passe ...' />
        <button type="submit">Login</button>
        <div style={{textAlign:'center'}}>
          Vous n'avez pas un compte, <Link to="/register"> Cliquez ici</Link>
        </div>
      </form> 
    </div>
  )
}

export default Login