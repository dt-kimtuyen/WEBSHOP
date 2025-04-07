const mongoose = require('../db'); // Kết nối với MongoDB

// Schema cho Product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image_path: String,
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });  // Timestamps tự động thêm createdAt và updatedAt

// Tạo model cho Product
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
