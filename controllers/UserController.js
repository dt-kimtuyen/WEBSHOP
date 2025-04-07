const User = require('../models/UserModel');

// Tạo người dùng mới
const createUser = async (req, res) => {
    const { fullname, email, password, phone, address, role } = req.body;
    const newUser = new User({ fullname, email, password, phone, address, role });

    try {
        await newUser.save();
        res.status(201).send('User created successfully!');
    } catch (error) {
        res.status(500).send('Error creating user: ' + error.message);
    }
};

// Lấy người dùng theo email
const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email }).populate('role', 'name');
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching user: ' + error.message);
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, fullname, gender, birthYear, role, status } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            email, fullname, gender, birth_year: birthYear, role, status
        }, { new: true });

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error updating user: ' + error.message);
    }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.send('User deleted successfully!');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting user: ' + error.message);
    }
};

// Lấy tất cả người dùng
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role', 'name');
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching users: ' + error.message);
    }
};

module.exports = { createUser, getUserByEmail, updateUser, deleteUser, getAllUsers };
