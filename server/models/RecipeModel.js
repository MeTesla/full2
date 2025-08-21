const mongoose= require('mongoose')

const recipeSchema = new mongoose.Schema({
    recipe:{type: String},
    description : {type: String},
    userId: {type: String}
})

const RecipeModel= mongoose.model('Recipe', recipeSchema)

module.exports = RecipeModel;