const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

function generateToken(id){
    const payload = {id}
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
}

const register = async(req, res)=>{
    const userData= req.body
    const userExists = await userModel.findOne({email : userData.email})
    if(userExists) return res.json('Vous avez déjà un compte')
    
    const user = new userModel(userData)
    try {
        await user.save()
        const token= generateToken(user._id)
        res.status(201).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }    
}


// Login
// Ajouter verification du mot de passe (comparaison)
// insatller bcrypt (salt, hasher mot de passe) 
// extraire userId du payload et l'attacher à la requête (middleware auth)
const login = async(req, res)=>{
    const userData = req.body
    try {
        const user = await userModel.findOne({email: userData.email})
        if (!user) return res.json('Vous devez vous enregistrer d\'abord')
        const token = generateToken(user._id)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
// All users
const users = async(req, res)=>{
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {register, login, users}