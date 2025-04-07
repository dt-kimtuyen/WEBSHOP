const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

// Các route cho Role
router.get('/', RoleController.getAllRoles);  // Lấy tất cả role
router.get('/:id', RoleController.getRoleById);  // Lấy role theo ID
router.get('/name/:name', RoleController.getRoleByName);  // Lấy role theo tên
router.post('/', RoleController.createRole);  // Tạo role mới
router.put('/:id', RoleController.updateRole);  // Cập nhật role
router.delete('/:id', RoleController.deleteRole);  // Xóa role

module.exports = router;
