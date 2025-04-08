const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Import model User
const session = require('express-session');

const router = express.Router();

// Middleware kiểm tra người dùng đã đăng nhập chưa
function checkAuthenticated(req, res, next) {
  if (req.session.user_id) {
    return next();  // Chuyển tiếp nếu người dùng đã đăng nhập
  }
  res.redirect('/admin/login');  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
}

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // Lấy email và mật khẩu từ request body

  try {
    // Tìm người dùng trong cơ sở dữ liệu theo email
    const admin = await User.findOne({ email });

    if (admin && admin.role_name === 'admin' && await bcrypt.compare(password, admin.password)) {
      // Nếu tìm thấy người dùng và mật khẩu đúng, tạo session và chuyển hướng
      req.session.user_id = admin._id;
      req.session.role = admin.role_name;
      return res.redirect('/admin/product-management');  // Chuyển đến trang quản lý sản phẩm
    } else {
      // Nếu thông tin đăng nhập sai, lưu lỗi và chuyển hướng lại trang login
      req.session.admin_login_error = 'Invalid email or password';
      return res.redirect('/admin/login');
    }
  } catch (err) {
    // Xử lý lỗi cơ sở dữ liệu
    return res.status(500).send('Database error');
  }
});

// Đăng xuất
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Logout error');
    }
    res.redirect('/admin/login');  // Sau khi đăng xuất, chuyển hướng về trang đăng nhập
  });
});

module.exports = router;
