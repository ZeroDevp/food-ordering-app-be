const express = require("express");
const router = express.Router()
const FoodController = require('../controller/FoodController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.post('/create', FoodController.createFood)
router.put('/update/:id', authMiddleware, FoodController.updateFood)
router.get('/get-details/:id', FoodController.getDetailFood)
router.delete('/delete/:id', FoodController.deleteFood)
router.get('/get-all/', FoodController.getAllFood)

module.exports = router


