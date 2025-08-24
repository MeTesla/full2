import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
 
function NewRecipe(){
    const [recipe, setRecipe] = useState("")
    const [description, setDescription] = useState("")
    //prop to parent = data + function
    const navigate = useNavigate()
    const location = useLocation()
    //const {id, recip, descriptio} = location.state || {}

    //console.log(id, recip, descriptio);


    const handleNewRecipe = async(ev)=>{
        ev.preventDefault()

    
        /////
          const newRecipe = {
                    "recipe": recipe,
                    "description": description
        }
        const token= localStorage.getItem('token')
        const response = await fetch("http://localhost:3000/recipes/newRecipe",

            {
                method: "POST",
                headers:{
                    
                    Authorization : `Bearer ${token}`,
                    "content-type": "application/json"
                },

            
                body: JSON.stringify(newRecipe) // !important
                
            }
        )
        const data = await response.json()
        console.log(data);
        ///
        navigate("/recipes")
    }
    return(
        <div>
            <h1>Ajouter une recette</h1>

            <form>
                <input type="text" name="recipe" 
                    value={recipe} 
                    onChange={(ev)=>setRecipe(ev.target.value)} 
                    placeholder="Nom de la recette"
                />
                <input type="text" name="description" 
                    value={description} 
                    onChange={(ev)=>setDescription(ev.target.value)} 
                    placeholder="Description de la recette ..." 
                />
                
                <input type="submit" name=""
                    onClick={handleNewRecipe}
                />
            </form>
        </div>
    
    )
}

export default NewRecipe