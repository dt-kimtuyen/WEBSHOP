const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route để tạo người dùng mới
router.post('/users', UserController.createUser);

// Route để lấy người dùng theo email
router.get('/users/email/:email', UserController.getUserByEmail);

// Route để cập nhật thông tin người dùng
router.put('/users/:id', UserController.updateUser);

// Route để xóa người dùng
router.delete('/users/:id', UserController.deleteUser);

// Route để lấy tất cả người dùng
router.get('/users', UserController.getAllUsers);

module.exports = router;
