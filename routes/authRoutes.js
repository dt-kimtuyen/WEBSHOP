const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const router = express.Router();

// Import model User để làm việc với MongoDB
const User = require('../models/UserModel');  // Đảm bảo đường dẫn tới UserModel.js đúng

// Route để hiển thị trang đăng ký
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth/signup.html'));
});

// Route xử lý đăng ký
router.post('/signup', async (req, res) => {
    const { fullname, email, password, phone, address, gender, birth_year, status } = req.body;

    // Kiểm tra nếu có trường nào bị bỏ trống
    if (!fullname || !email || !password || !phone || !address) {
        return res.status(400).send('All fields are required');
    }

    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('Email already exists');
    }

    // Mã hóa mật khẩu trước khi lưu vào DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mới user và lưu vào MongoDB
    const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        phone,
        address,
        gender,
        birth_year,
        status
    });

    try {
        console.log("Saving user to DB...");
        await newUser.save();  // Lưu vào cơ sở dữ liệu
        console.log("User saved successfully!");
        res.locals.successMessage = "Registration successful! You can now log in.";
        res.status(201).redirect('/auth/login');  // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
        console.error("Error when saving user:", error);
        res.status(500).send('Error registering user: ' + error.message);
    }
});


// Route để hiển thị trang đăng nhập
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/auth/login.html'));
});

// Route xử lý đăng nhập
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra email trong cơ sở dữ liệu
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }

    // Kiểm tra mật khẩu với bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send('Invalid email or password');
    }

    // Lưu thông tin người dùng vào session
    req.session.user = user;

    // Chuyển hướng đến trang home sau khi đăng nhập thành công
    res.redirect('/home');
});

module.exports = router;
