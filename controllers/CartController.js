const express = require('express');
const { Receipt, ReceiptItem } = require('../models/Receipt');  // Import models Receipt và ReceiptItem
const session = require('express-session');

const router = express.Router();

// Middleware kiểm tra người dùng đã đăng nhập hay chưa
function checkAuthenticated(req, res, next) {
  if (req.session.user_id) {
    return next();  // Chuyển tiếp nếu người dùng đã đăng nhập
  }
  res.redirect('/login');  // Nếu chưa đăng nhập, chuyển hướng đến trang login
}

// Trang giỏ hàng (Hiển thị giỏ hàng)
router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];  // Lấy giỏ hàng từ session (nếu có)
  res.render('cart/index', { cart });
});

// Thêm sản phẩm vào giỏ hàng
router.post('/cart/add', (req, res) => {
  const { product_id, name, price, quantity } = req.body;

  // Kiểm tra xem dữ liệu có hợp lệ không
  if (!product_id || !name || !price || !quantity) {
    return res.status(400).json({ status: 'error', message: 'Invalid input data.' });
  }

  // Khởi tạo giỏ hàng nếu chưa có
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProduct = req.session.cart.find(item => item.product_id === product_id);
  
  if (existingProduct) {
    // Nếu sản phẩm đã có, cập nhật số lượng
    existingProduct.quantity += quantity;
  } else {
    // Nếu chưa có, thêm sản phẩm vào giỏ
    req.session.cart.push({ product_id, name, price, quantity });
  }

  // Trả về kết quả
  res.json({ status: 'success', message: 'Product added to cart successfully!' });
});

// Thanh toán (checkout)
router.post('/cart/checkout', checkAuthenticated, async (req, res) => {
  const cart = req.session.cart;

  if (!cart || cart.length === 0) {
    return res.redirect('/cart');  // Nếu giỏ hàng rỗng, chuyển hướng về trang giỏ hàng
  }

  const userId = req.session.user_id;  // Lấy user_id từ session
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);  // Tính tổng tiền

  try {
    // Tạo hóa đơn
    const receipt = new Receipt({
      user_id: userId,
      total_price: totalPrice,
      payment_status: 'completed', // Giả sử thanh toán thành công
    });

    // Lưu hóa đơn vào cơ sở dữ liệu
    await receipt.save();

    // Tạo các mục hóa đơn
    for (const item of cart) {
      const receiptItem = new ReceiptItem({
        receipt_id: receipt._id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      });
      await receiptItem.save();
    }

    // Xóa giỏ hàng sau khi thanh toán thành công
    req.session.cart = [];

    // Trả về hóa đơn và các mục hóa đơn
    res.render('cart/receipt', { receipt, cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Error processing checkout.' });
  }
});

module.exports = router;
