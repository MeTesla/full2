import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function Recipes (){
    const [recipes, setRecipes] = useState([])
    
    // GET ALL RECIPES
    useEffect(()=>{
        const token = localStorage.getItem('token')
        
        const fetchData = async()=>{
             const response = await fetch("http://localhost:3000/recipes",
            {   
            method : "GET",
            headers :{
                Authorization : `Bearer ${token}`,
                "content-type": "application/json" 
            }
        })
        const data = await response.json();

        setRecipes(data)

        }       
        fetchData()
        },[recipes])

    
    // ADD RECIPE
    const handleAddRecipe = async()=>{
        const recipe = {
                    "recipe": "Tagine",
                    "description": "Tagine au poulet"
        }
        const token= localStorage.getItem('token')
        const response = await fetch("http://localhost:3000/recipes/newRecipe",

            {
                method: "POST",
                headers:{
                    
                    Authorization : `Bearer ${token}`,
                    "content-type": "application/json"
                },

            
                body: JSON.stringify(recipe) // !important
                
            }
        )
        const data = await response.json()
        console.log(data);
        
        
        
    }
    
    // DEETE RECIPE
    const handleDelete= async(id)=>{
        const token = localStorage.getItem('token')
        console.log(id);
        const response = await fetch(`http://localhost:3000/recipes/${id}`,
            {
                method: "delete",
                headers:{
                    Authorization:"Bearer " + token,
                    "content-type" : "application/json",
                }
            }

        )
        const data = response.json()
        console.log(data);
        
    }
    const navigate = useNavigate();
    const handleEdit= (id)=>{
         
         navigate('/Recipes/newrecipe')
    }
    return(
        <div>
            <h1>Recipes</h1>
            <button
                onClick={handleAddRecipe}
            >Add recipe</button>

            <div className="recipes-container">
                {recipes.map(recipe=>(
                    <div className="card-recipe" key={recipe._id}>

                            <h2>{recipe.recipe}</h2>
                            <div>{recipe.description}</div>
                            <div className="controls">
                                <div
                                    onClick={()=>handleDelete(recipe._id)}
                                ><FontAwesomeIcon icon={faTrashCan} /></div>
                                <div
                                    onClick={()=>handleEdit(recipe._id)}
                                ><FontAwesomeIcon icon={faPen} /></div>
                            </div>
                            
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recipes