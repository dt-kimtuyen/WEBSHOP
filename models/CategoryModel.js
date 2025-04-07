const mongoose = require('../db'); // Kết nối với MongoDB

// Tạo schema cho Category
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });  // Timestamps tự động thêm createdAt và updatedAt

// Tạo model cho Category
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
