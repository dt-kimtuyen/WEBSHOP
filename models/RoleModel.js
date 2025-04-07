const mongoose = require('../db'); // Kết nối với MongoDB

// Tạo schema cho Role
const roleSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    description: String
}, { timestamps: true });  // Timestamps tự động thêm createdAt và updatedAt

// Tạo model Role từ schema
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
