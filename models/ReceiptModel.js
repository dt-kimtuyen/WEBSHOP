const mongoose = require('../db'); // Kết nối với MongoDB

// Tạo schema cho Receipt
const receiptSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    total_price: Number,
    payment_status: { type: String, default: 'pending' },
    purchase_date: { type: Date, default: Date.now }
}, { timestamps: true });

// Tạo schema cho ReceiptItem
const receiptItemSchema = new mongoose.Schema({
    receipt_id: mongoose.Schema.Types.ObjectId,
    product_id: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    price: Number
});

// Tạo model Receipt và ReceiptItem
const Receipt = mongoose.model('Receipt', receiptSchema);
const ReceiptItem = mongoose.model('ReceiptItem', receiptItemSchema);

module.exports = { Receipt, ReceiptItem };
