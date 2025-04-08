const Product = require('../models/productModel');
const Category = require('../models/CategoryModel');
const multer = require('multer');
const path = require('path');

// Cấu hình Multer để lưu ảnh vào thư mục uploads/images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads/images';
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Kiểm tra xem file có phải là ảnh không
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            return cb(new Error('Only image files are allowed.'));
        }
    },
});

// Tạo Product mới
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category_id } = req.body;
        // Nếu có ảnh tải lên, lấy đường dẫn ảnh
        const imagePath = req.file ? `/images/${req.file.filename}` : null;

        const product = new Product({
            name,
            description,
            price,
            image_path: imagePath,
            category_id
        });

        await product.save();
        res.status(201).send('Product created successfully!');
    } catch (error) {
        res.status(500).send('Error creating product: ' + error.message);
    }
};


// Lấy tất cả các Products
// Lấy tất cả các Products với tìm kiếm (nếu có)
const getAllProducts = async (req, res) => {
    try {
        const searchQuery = req.query.search || '';
        const products = await Product.find({ 
            name: { $regex: searchQuery, $options: 'i' }, 
            isDeleted: false
        }).populate('category_id');
        res.json(products);
    } catch (error) {
        res.status(500).send('Error fetching products: ' + error.message);
    }
};


// Hàm lấy sản phẩm theo ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);  // Trả về sản phẩm dưới dạng JSON
    } catch (error) {
        res.status(500).send('Error fetching product: ' + error.message);
    }
};


// Cập nhật Product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;
    // Nếu không có ảnh mới, giữ nguyên đường dẫn ảnh cũ
    const imagePath = req.file ? `/images/${req.file.filename}` : undefined;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category_id,
            image_path: imagePath !== undefined ? imagePath : undefined
        }, { new: true });

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        } else {
            res.json(updatedProduct);
        }
    } catch (error) {
        res.status(500).send('Error updating product: ' + error.message);
    }
};


// Xóa Product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!deletedProduct) {
            res.status(404).send('Product not found');
        } else {
            res.send('Product deleted successfully');
        }
    } catch (error) {
        res.status(500).send('Error deleting product: ' + error.message);
    }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, upload };
