const express = require('express')

const {getAllRecipes, getOneRecipe, addRecipe, editRecipe, deleteRecipe} = require('../controllers/recipeControllers.js')
const authenticate = require('../middleware/auth.js')

const router = express.Router()

// Middleware protect routes
router.use(authenticate)
 
//Get All recipes
router.get('/recipes', getAllRecipes)

// Get One recipe
router.get('/recipes/:id', getOneRecipe)

// Ajouter recipe
router.post('/recipes/newRecipe', addRecipe )

// Update recipe
router.put('/recipes/editRecipe/:id', editRecipe)

// Delete recipe
router.delete('/recipes/:id', deleteRecipe)



module.exports = router