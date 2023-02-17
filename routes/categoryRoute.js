const express = require('express')
const categoryController = require('../controllers/categoryController')

const router = express.Router()

router.route('/').post(categoryController.createCategory)
router.route('/').get(categoryController.getAllCategories) 
router.route('/:slug').delete(categoryController.deleteCategory) 

module.exports = router
