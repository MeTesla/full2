const express = require('express')
const connect = require('./connect.js')
const cors = require('cors')
const recipeRouter = require('./routes/recipeRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const data = require('./data.js')

const app=express()


connect()

app.use(cors())
app.use(express.json())


app.get('/quiz', (req, res)=>{
    const questions =  data
    res.json(questions[0])
})
// l'ordre est important : mettre user après recipe déclenche la demande d'authentification pour accéder à BD
app.use(userRouter)
app.use(recipeRouter)




app.listen('3000', ()=>{
    console.log("Server run on port 3000");    
})