const Appointment = require('../models/appointmentModel');

// Tạo cuộc hẹn mới
const createAppointment = async (req, res) => {
    const { pet_info, user_id, appointment_date, appointment_time, context } = req.body;
    const appointment = new Appointment({
        pet_info,
        user_id,
        appointment_date,
        appointment_time,
        context
    });

    try {
        await appointment.save();
        res.status(201).send('Cuộc hẹn đã được tạo thành công!');
    } catch (error) {
        res.status(500).send('Lỗi khi tạo cuộc hẹn: ' + error.message);
    }
};

// Lấy tất cả cuộc hẹn
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('user_id', 'fullname email');
        res.json(appointments);
    } catch (error) {
        res.status(500).send('Lỗi khi lấy cuộc hẹn: ' + error.message);
    }
};

// Tìm kiếm cuộc hẹn
const searchAppointments = async (req, res) => {
    const search = req.query.search || '';
    try {
        const appointments = await Appointment.find({
            $or: [
                { pet_info: { $regex: search, $options: 'i' } },
                { context: { $regex: search, $options: 'i' } }
            ]
        }).populate('user_id', 'fullname email');
        res.json(appointments);
    } catch (error) {
        res.status(500).send('Lỗi khi tìm kiếm: ' + error.message);
    }
};

module.exports = { createAppointment, getAllAppointments, searchAppointments };
