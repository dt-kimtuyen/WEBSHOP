const Role = require('../models/RoleModel');

// Lấy tất cả các role
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).send('Error fetching roles: ' + error.message);
    }
};

// Lấy role theo ID
const getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findById(id);
        if (role) {
            res.json(role);
        } else {
            res.status(404).send('Role not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching role: ' + error.message);
    }
};

// Lấy role theo tên
const getRoleByName = async (req, res) => {
    const { name } = req.params;
    try {
        const role = await Role.findOne({ name });
        if (role) {
            res.json(role);
        } else {
            res.status(404).send('Role not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching role: ' + error.message);
    }
};

// Tạo role mới
const createRole = async (req, res) => {
    const { name, description } = req.body;
    const newRole = new Role({ name, description });

    try {
        await newRole.save();
        res.status(201).send('Role created successfully!');
    } catch (error) {
        res.status(500).send('Error creating role: ' + error.message);
    }
};

// Cập nhật role
const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedRole = await Role.findByIdAndUpdate(id, { name, description }, { new: true });
        if (updatedRole) {
            res.json(updatedRole);
        } else {
            res.status(404).send('Role not found');
        }
    } catch (error) {
        res.status(500).send('Error updating role: ' + error.message);
    }
};

// Xóa role
const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRole = await Role.findByIdAndDelete(id);
        if (deletedRole) {
            res.send('Role deleted successfully!');
        } else {
            res.status(404).send('Role not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting role: ' + error.message);
    }
};

module.exports = { getAllRoles, getRoleById, getRoleByName, createRole, updateRole, deleteRole };
