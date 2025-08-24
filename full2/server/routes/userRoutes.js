const express = require('express')
const {register, login, users} = require('../controllers/userControllers')
const userRouter = express.Router()

userRouter.post('/register', register )

userRouter.post('/login', login )

userRouter.get('/users', users )

module.exports = userRouter