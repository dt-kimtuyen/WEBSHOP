const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose'); // Kết nối với MongoDB
const app = express();
const port = 3000;

// Import các route
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Middleware để parse JSON và form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình session cho người dùng
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Nếu bạn không sử dụng HTTPS, set cookie này là false
}));

// Đăng ký các route API
app.use('/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Route cho trang chủ (trả về file HTML)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home', 'index.html'));
});

// Route cho trang home
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'views', 'home', 'index.html')); // Đảm bảo file 'index.html' tồn tại trong thư mục 'home'
    } else {
        res.redirect('/auth/login'); // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang login
    }
});


// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy trên http://localhost:${port}`);
});
