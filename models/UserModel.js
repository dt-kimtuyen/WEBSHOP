const mongoose = require('../db'); // Kết nối với MongoDB

// Tạo schema cho User
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    role: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role' 
    },
    gender: String,
    birth_year: Number,
    status: String
}, { timestamps: true });

// Tạo model User từ schema
const User = mongoose.model('User', userSchema);

module.exports = User;
