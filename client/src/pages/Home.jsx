import React , {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../contexts/Auth'


function Home() {
  const [recettes, setRecettes] = useState([])

  
    useEffect(()=>{
      const recettes = async()=>{
        const response = await fetch('http://localhost:3000/allrecipes')
        const data = await response.json()
        setRecettes(data)
      }
      recettes()
    },[])
  

  return (
    <div>
      <div className="hero">
        <div className="titles">
          <h1>A vos marmites !!!</h1>
          <h2>Plus de <span style={{color:'orange', fontWeight:'bold'}}>5000</span> recettes facile a preparer</h2>
        </div>
        
      </div>

<h1 style={{margin:'40px'}}>Nos Recettes</h1>
       
      <div className="all-recettes">
         {recettes.map(recette=>(
          <div className="card-recipe" key={recette._id}>
                  <h2>{recette.recipe}</h2>
                  <div>{recette.description}</div>                                              
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
