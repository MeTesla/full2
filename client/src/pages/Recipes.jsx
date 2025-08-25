import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

function Recipes (){


    const [recipes, setRecipes] = useState([])
    const [fav, setFav] = useState([])
    const navigate = useNavigate();

    // LocalStorage
    useEffect( ()=>{
        const favLS = JSON.parse(localStorage.getItem('fav')) 
        favLS && setFav(favLS)
    },[])

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
    },[])


    
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
    
    
    const handleEditRecipe= (id, recip, descriptio)=>{    
        const data = { id, recip, descriptio };     
        navigate('/recipes/editrecipe', {state : data})
    }

    const handleFav = (id)=>{
        if (fav.includes(id)) {
            const filtredFav = fav.filter(el=>el!==id)
            setFav(filtredFav)
            localStorage.setItem('fav',JSON.stringify(filtredFav))
            return
        }        
        // setFav(prev=>[...prev, id]) // a memoriser                
        // localStorage.setItem('fav',JSON.stringify(fav))
        // L'ERREUR :
        /*Il y a un problème dans la façon dont tu mets à jour le localStorage après avoir ajouté 
        un nouvel élément à la liste des favoris. Lorsque tu utilises setFav pour ajouter un nouvel élément, 
        la mise à jour de l'état est asynchrone. Cela signifie que lorsque tu appelles localStorage.
        setItem('fav', JSON.stringify(fav)) juste après setFav, 
        tu obtiens toujours l'ancienne valeur de fav, pas la nouvelle.*/

        setFav(prev => {
            const newFav = [...prev, id]; // Crée un nouveau tableau avec l'ID ajouté
            localStorage.setItem('fav', JSON.stringify(newFav)); // Met à jour le localStorage ici
            // console.log(newFav);
            
            return newFav; // Retourne le nouveau tableau pour mettre à jour l'état
        });
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
                                <FontAwesomeIcon icon={faBookmark} 
                                    className={fav && fav.includes(recipe._id) ? 'fav' : 'not'}
                                    onClick ={()=>handleFav(recipe._id)} 
                                />
                            </div>
                            
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recipes