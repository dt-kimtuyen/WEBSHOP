const Category = require('../models/CategoryModel');

// Lấy tất cả các Category
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Error fetching categories: ' + error.message);
    }
};

// Lấy Category theo ID
const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            res.status(404).send('Category not found');
        } else {
            res.json(category);
        }
    } catch (error) {
        res.status(500).send('Error fetching category: ' + error.message);
    }
};

// Tạo Category mới
const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).send('Error creating category: ' + error.message);
    }
};

// Cập nhật Category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!updatedCategory) {
            res.status(404).send('Category not found');
        } else {
            res.json(updatedCategory);
        }
    } catch (error) {
        res.status(500).send('Error updating category: ' + error.message);
    }
};

// Xóa Category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.status(404).send('Category not found');
        } else {
            res.json({ status: 'success', message: 'Category deleted successfully.' });
        }
    } catch (error) {
        res.status(500).send('Error deleting category: ' + error.message);
    }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
