const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose'); // Kết nối với MongoDB
const multer = require('multer'); 
const app = express();
const port = 3000;

// Đảm bảo máy chủ phục vụ tệp tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Import các route
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ProductController = require('./controllers/ProductController');  // Đảm bảo đường dẫn đúng

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

// Cấu hình multer để lưu ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Lưu vào thư mục 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Tên file với timestamp
    }
});

const upload = multer({ storage: storage });

// Đăng ký các route API
app.use('/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/receipts', receiptRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Serve static files (css, js, images)
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

// Route cho trang home
app.get('/home', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'views', 'home', 'index.html')); // Đảm bảo file 'index.html' tồn tại trong thư mục 'home'
    } else {
        res.redirect('/auth/login'); // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang login
    }
});

// Route mặc định '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home', 'index.html')); // Trả về trang chủ
});

// Cấu hình để phục vụ hình ảnh trong 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route cho trang sản phẩm
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'products', 'index.html')); // Trả về trang sản phẩm
});

// Cập nhật route để lấy chi tiết sản phẩm
app.get('/products/:id', ProductController.getProductById);  // Cập nhật route lấy chi tiết sản phẩm

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy trên http://localhost:${port}`);
});
