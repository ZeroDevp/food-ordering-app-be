const express = require("express");
const router = express.Router()
const BlogController = require('../controller/BlogController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.post('/create', BlogController.createBlog)
router.put('/update/:id', BlogController.updateBlog)
router.get('/get-details/:id', BlogController.getDetailBlog)
router.delete('/delete/:id', BlogController.deleteBlog)
router.get('/get-all', BlogController.getAllBlog)

module.exports = router