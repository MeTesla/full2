const express = require('express')
const RecipeModel = require('../models/RecipeModel.js')

//Get All recipes
const getAllRecipes = async(req, res)=>{
    const userId = req.userId
    try{
    const recipes = await RecipeModel.find({userId})
    res.status(200).json(recipes)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//Get One recipe
const getOneRecipe = async(req, res)=>{
    const recipe = req.params.id
    try {
        const findRecipe = await RecipeModel.findById(recipe)
        if (!findRecipe) return res.json('No recipe found')
        res.status(200).json(findRecipe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Add recipe
const addRecipe = async(req, res)=>{
    const userId = req.userId
    const {recipe} = req.body
    console.log(recipe);
    
    try {
        const newRecipe = new RecipeModel({...req.body,  userId})
        await newRecipe.save()
        res.status(200).json(newRecipe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Update recipe
const editRecipe = async(req, res)=>{
    const recipeId = req.params.id
    try {
        const updateRecipe = await RecipeModel.findByIdAndUpdate(recipeId, req.body,{
            new : true,
            runValidators: true
        })
        res.status(200).json(updateRecipe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete recipe
const deleteRecipe =  async(req,res)=>{
    const recipe2delete = req.params.id
    try {
        const recipe = await RecipeModel.findByIdAndDelete(recipe2delete)
        if(!recipe) return res.json('Ne recipe to delete with this ID')
        res.status(200).json('Recipe is deleted succeesfuly')
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { 
    getAllRecipes ,
    getOneRecipe ,
    addRecipe,
    editRecipe,
    deleteRecipe }
    
