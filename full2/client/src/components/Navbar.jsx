import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/Auth"
import { toast } from "react-toastify"

function Navbar (){
    const {user, setUser} = useContext(AuthContext)
    function handleLogout (){
        setUser("")
        toast.error("vous avez quitté")
        localStorage.removeItem('token')
    }
    return(
        <div className="navbar">
        {user ? 
            <ul className="menu">
                <li>
                    <Link to = "/">Accueil</Link>
                </li>
                
                <li> 
                    <Link to = "./Recipes"> Recipes </Link>
                </li>
                
                <li> 
                    {/* <Link to = "./logout">Logout</Link> */}
                    <div className="logout" onClick={handleLogout}>Logout</div>
                </li>
                
                
            </ul>
         :
            <ul className="menu">
                <li>
                    <Link to = "/">Accueil</Link>
                </li>
                <li> 
                    <Link to = "./register">Register</Link>
                </li>
                <li> 
                    <Link to = "./login">Login</Link>
                </li>

            </ul>
        }
        </div>
        
    )
} 
export default Navbar