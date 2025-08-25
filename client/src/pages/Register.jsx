import {useContext, useRef} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../contexts/Auth'
function Register() {

  const {registerUser} = useContext(AuthContext)
  const formData = useRef(null)
  function handleFormData(e){
    e.preventDefault()
    const data = new FormData(formData.current)
    const mydata = Object.fromEntries(data)
    registerUser(mydata)
  }
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleFormData}
        ref={formData}
        className='login-form'>
        <input type="email" name="email" placeholder='Votre émail ...' />
        <input type="password" name="password" placeholder='Mot de passe ...' />
        <button type="submit">Register</button>
        <div style={{textAlign:'center'}}>
          Vous avez un compte, <Link to="/login"> Cliquez ici</Link>
        </div>
      </form> 
    </div>
  )
}

export default Register
