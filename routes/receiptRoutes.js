const express = require('express');
const router = express.Router();
const ReceiptController = require('../controllers/ReceiptController');

// Các route cho Receipt
router.post('/', async (req, res) => {
    try {
        const { userId, totalPrice, paymentStatus } = req.body;
        const receiptId = await ReceiptController.createReceipt(userId, totalPrice, paymentStatus);
        res.status(201).json({ receiptId });
    } catch (error) {
        res.status(500).send('Error creating receipt: ' + error.message);
    }
});

router.post('/:receiptId/items', async (req, res) => {
    try {
        const { receiptId } = req.params;
        const { productId, quantity, price } = req.body;
        await ReceiptController.addReceiptItem(receiptId, productId, quantity, price);
        res.status(201).send('Receipt item added');
    } catch (error) {
        res.status(500).send('Error adding receipt item: ' + error.message);
    }
});

router.get('/:receiptId', async (req, res) => {
    try {
        const { receiptId } = req.params;
        const receipt = await ReceiptController.getReceiptById(receiptId);
        const items = await ReceiptController.getReceiptItems(receiptId);
        res.json({ receipt, items });
    } catch (error) {
        res.status(500).send('Error fetching receipt: ' + error.message);
    }
});

router.put('/:receiptId/payment-status', async (req, res) => {
    try {
        const { receiptId } = req.params;
        const { paymentStatus } = req.body;
        const updatedReceipt = await ReceiptController.updatePaymentStatus(receiptId, paymentStatus);
        res.json(updatedReceipt);
    } catch (error) {
        res.status(500).send('Error updating payment status: ' + error.message);
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const receipts = await ReceiptController.getReceiptsByUserId(userId);
        res.json(receipts);
    } catch (error) {
        res.status(500).send('Error fetching receipts: ' + error.message);
    }
});

module.exports = router;
