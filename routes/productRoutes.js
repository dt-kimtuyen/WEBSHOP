const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Tạo product mới, sử dụng multer để upload ảnh
router.post('/', ProductController.upload.single('image'), ProductController.createProduct);

// Lấy tất cả products
router.get('/', ProductController.getAllProducts);

// Lấy product theo ID
router.get('/:id', ProductController.getProductById);

// Cập nhật product, sử dụng multer để upload ảnh
router.put('/:id', ProductController.upload.single('image'), ProductController.updateProduct);

// Xóa product
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
