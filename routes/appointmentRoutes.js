const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');

// Tạo cuộc hẹn mới
router.post('/appointments', AppointmentController.createAppointment);

// Lấy tất cả cuộc hẹn
router.get('/appointments', AppointmentController.getAllAppointments);

// Tìm kiếm cuộc hẹn
router.get('/appointments/search', AppointmentController.searchAppointments);

module.exports = router;
