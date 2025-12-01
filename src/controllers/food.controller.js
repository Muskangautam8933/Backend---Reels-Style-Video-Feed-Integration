const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4:uuid} = require('uuid');


async function createFood(req, res){

  const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())
  
  const foodItems = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner : req.foodPartner._id
  })
  
  
  res.status(201).json({
    message:"food created successfully",
    food:foodItems
  })
}

async function getFoodItems(req,res){
   const foodItems = await foodModel.find({})
   res.status(200).json({
    message:"Food items fetched successfully",
    foodItems
   })
}

module.exports = {
    createFood,
    getFoodItems
}