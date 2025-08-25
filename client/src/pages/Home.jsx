import React , {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../contexts/Auth'

    /*
    PAGINATION :
    comment je code un systeme de pagination pour ma requete react et mon back express. 
    je veux au début afficher 15 elements de la réponse. 
    au clique sur le boutton suivant il m'affiche 15 autres. 

    comment limiter le nombres d'éléments dans une requête fetch dans un projet react 
    et comment faire la même chose côté backend (express, mongodb)
    */

function Home() {
  const [recettes, setRecettes] = useState([])

  
    useEffect(()=>{
      const recettes = async()=>{
        const response = await fetch('http://localhost:3000/allrecipes?limit=10')
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
        <div className='plus'>+</div>
      </div>
    </div>
  )
}

export default Home
