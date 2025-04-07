const { Receipt, ReceiptItem } = require('../models/ReceiptModel');

// Tạo hóa đơn mới
const createReceipt = async (userId, totalPrice, paymentStatus = 'pending') => {
    const newReceipt = new Receipt({
        user_id: userId,
        total_price: totalPrice,
        payment_status: paymentStatus
    });
    
    try {
        await newReceipt.save();
        return newReceipt._id;
    } catch (error) {
        throw new Error('Error creating receipt: ' + error.message);
    }
};

// Thêm item vào hóa đơn
const addReceiptItem = async (receiptId, productId, quantity, price) => {
    const newItem = new ReceiptItem({
        receipt_id: receiptId,
        product_id: productId,
        quantity: quantity,
        price: price
    });

    try {
        await newItem.save();
        return true;
    } catch (error) {
        throw new Error('Error adding receipt item: ' + error.message);
    }
};

// Lấy thông tin hóa đơn theo ID
const getReceiptById = async (receiptId) => {
    try {
        const receipt = await Receipt.findById(receiptId).populate('user_id', 'fullname email');
        if (!receipt) {
            throw new Error('Receipt not found');
        }
        return receipt;
    } catch (error) {
        throw new Error('Error fetching receipt: ' + error.message);
    }
};

// Lấy các items trong hóa đơn
const getReceiptItems = async (receiptId) => {
    try {
        const items = await ReceiptItem.find({ receipt_id: receiptId }).populate('product_id', 'name');
        return items;
    } catch (error) {
        throw new Error('Error fetching receipt items: ' + error.message);
    }
};

// Cập nhật trạng thái thanh toán
const updatePaymentStatus = async (receiptId, paymentStatus) => {
    try {
        const updatedReceipt = await Receipt.findByIdAndUpdate(receiptId, { payment_status: paymentStatus }, { new: true });
        return updatedReceipt;
    } catch (error) {
        throw new Error('Error updating payment status: ' + error.message);
    }
};

// Lấy tất cả hóa đơn của người dùng
const getReceiptsByUserId = async (userId) => {
    try {
        const receipts = await Receipt.find({ user_id: userId }).sort({ purchase_date: -1 });
        return receipts;
    } catch (error) {
        throw new Error('Error fetching receipts: ' + error.message);
    }
};

module.exports = { createReceipt, addReceiptItem, getReceiptById, getReceiptItems, updatePaymentStatus, getReceiptsByUserId };
