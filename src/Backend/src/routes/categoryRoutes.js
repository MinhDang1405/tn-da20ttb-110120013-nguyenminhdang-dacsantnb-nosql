const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/:id/category', categoryController.createCategory);

router.get('/:id/category', categoryController.getAllCategories);

router.get('/:id/category/:categoryId', categoryController.getCategoryById);

router.put('/:id/category/:categoryId', categoryController.updateCategoryById);

router.delete('/:id/category/:categoryId', categoryController.deleteCategoryById);

router.delete('/:specialtyId/categories', categoryController.deleteMultipleCategories);

module.exports = router;
