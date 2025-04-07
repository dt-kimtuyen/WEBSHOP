const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Các route cho Category
router.get('/', CategoryController.getAllCategories);  // Lấy tất cả categories
router.get('/:id', CategoryController.getCategoryById);  // Lấy category theo ID
router.post('/', CategoryController.createCategory);  // Tạo category mới
router.put('/:id', CategoryController.updateCategory);  // Cập nhật category
router.delete('/:id', CategoryController.deleteCategory);  // Xóa category

module.exports = router;
