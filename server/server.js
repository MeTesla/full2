// Supprimer de pc
// From tablet
// From phone again
/* 
1- create repo on git hub. laisser vierge
2- in local (pc): 
    git init, 
    create credentials user name & email
    lier local à distant:       git remote add origin URL_DU_DEPOT
    Push pc repo to git hub :   git push -u origin main
    Vérifier local est lié      git remote -v
3- in local (phone /tablet) :
    git init, 
    create credentials user name & email
    git colone https:github.com/MeTesla/full2.git || git remote add origin url_repo
    Modifier puis PULL + TOKEN

*/
const express = require('express')
const connect = require('./connect.js')
const cors = require('cors')
const recipeRouter = require('./routes/recipeRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const data = require('./data.js')
const RecipeModel = require('./models/RecipeModel.js')

const app=express()


connect()

app.use(cors())
app.use(express.json())


app.get('/quiz', (req, res)=>{
    const questions =  data
    res.json(questions[0])
})
// l'ordre est important : mettre user après recipe déclenche la demande d'authentification pour accéder à BD
app.get('/allrecipes', async(req, res)=>{
    const limit = parseInt(req.query.limit)
    try {
        const recipes = await RecipeModel.find().limit(limit)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})
app.use(userRouter)
app.use(recipeRouter)

app.listen('3000', ()=>{
    console.log("Server run on port 3000");    
})