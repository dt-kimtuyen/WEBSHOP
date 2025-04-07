const mongoose = require('../db');

// Tạo Schema cho Appointment
const appointmentSchema = new mongoose.Schema({
    pet_info: String,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appointment_date: Date,
    appointment_time: String,
    context: String
});

// Tạo model Appointment
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
