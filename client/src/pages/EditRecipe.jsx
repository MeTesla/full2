import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
 
function EditRecipe(){

    //prop to parent = data + function
    const navigate = useNavigate()
    const location = useLocation()
    const {id, recip, descriptio} = location.state || {}
    
    const [recipe, setRecipe] = useState(recip)
    const [description, setDescription] = useState(descriptio)

    
    const handleEditRecipe = async(ev)=>{
        ev.preventDefault()

    
        /////
          const editedRecipe = {
                    "recipe": recipe,
                    "description": description
        }
        const token= localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/recipes/editRecipe/${id}`,

            {
                method: "PUT",
                headers:{
                    
                    Authorization : `Bearer ${token}`,
                    "content-type": "application/json"
                },

            
                body: JSON.stringify(editedRecipe) // !important
                
            }
        )
        const data = await response.json()
        console.log(data);
        ///navigate("/recipes")
        toast.success('La recette est mise à jour avec succès')
    }
    return(
        <div>
            <h1>Add recipe</h1>

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
                     onClick={handleEditRecipe}
                />
            </form>
        </div>
    
    )
}

export default EditRecipe