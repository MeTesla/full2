import { useState } from "react"

 
function NewRecipe(){
    const [recipe, setRecipe] = useState("")
    const [description, setDescription] = useState("")
    //prop to parent = data + function

    const handleNewRecipe = (ev)=>{
        ev.preventDefault()
        console.log("Recipe : " + recipe);
        console.log("Description : " + description)
        
    }
    return(
        <div>
            <h1>Add recipe</h1>

            <form>
                <input type="text" name="recipe" value={recipe} onChange={(ev)=>setRecipe(ev.target.value)} placeholder="Nom de la recette"/>
                <input type="text" name="description" value={description} onChange={(ev)=>setDescription(ev.target.value)} placeholder="Description de la recette ..." />
                <input type="submit" name=""
                    onClick={handleNewRecipe}
                />
            </form>
        </div>
    
    )
}

export default NewRecipe