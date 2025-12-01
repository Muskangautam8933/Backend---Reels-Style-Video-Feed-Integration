const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router();
//multer is used so that postman can read file or text both and send response because express server are not able to read data that are send from frontend
const multer = require('multer')

const upload = multer({
    storage:multer.memoryStorage(),
})
//Method - POST URL:/api/food/  this is [protected] 
router.post('/',
    authMiddleware.authFoodPartnerMiddleware ,
    upload.single("video") , 
    foodController.createFood);

//GET /api/food [protected]
router.get('/',
   authMiddleware.authUserMiddleware,
   foodController.getFoodItems
)

module.exports = router; 