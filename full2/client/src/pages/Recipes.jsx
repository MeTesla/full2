import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

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
      navigate('/recipes/newrecipe')
    }
    
    // DEETE RECIPE
    const handleDeleteRecipe= async(id)=>{
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
    
    const handleEditRecipe= (id, recip, descriptio)=>{    
        const data = { id, recip, descriptio };     
        navigate('/recipes/editrecipe', {state : data})
    }

    return(
        <div>
            <h1>Recipes</h1>
            <button
                className="add-recipe"
                onClick={handleAddRecipe}
            >Add recipe
            </button>

            <div className="recipes-container">
                {recipes.map(recipe=>(
                    <div className="card-recipe" key={recipe._id}>
                            <h2>{recipe.recipe}</h2>
                            <div>{recipe.description}</div>
                            <div className="controls">
                                <div
                                    onClick={()=>handleDeleteRecipe(recipe._id)}
                                ><FontAwesomeIcon icon={faTrashCan} /></div>
                                <div
                                    onClick={()=>handleEditRecipe(recipe._id, recipe.recipe, recipe.description)}
                                ><FontAwesomeIcon icon={faPen} />
                                </div>
                            </div>
                            <div className="favorite">
                                <FontAwesomeIcon icon={faBookmark} />
                            </div>
                            
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recipes