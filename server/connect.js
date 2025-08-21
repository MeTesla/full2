const mongodb = require('mongodb')
const mongoose = require('mongoose')

const dotenv= require('dotenv').config()

const connect = ()=>{
    mongoose.connect(process.env.URL)
    .then(()=>console.log('Le système est connecté à la base de données'))
}

//module.exports(connect)
module.exports = connect