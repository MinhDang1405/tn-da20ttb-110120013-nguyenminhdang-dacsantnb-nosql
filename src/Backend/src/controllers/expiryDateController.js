const Specialty = require('../models/Specialty');

// Tạo một expiry date mới
exports.createExpiryDate = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const expiryDate = req.body;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        specialty.expiry_date.push(expiryDate);
        await specialty.save();
        res.status(201).json({ message: 'Expiry Date created successfully', expiryDate: expiryDate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả các expiry dates của một specialty
exports.getAllExpiryDates = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.json(specialty.expiry_date);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin một expiry date trong một specialty theo ID
exports.getExpiryDateById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const expiryDateId = req.params.expiryDateId;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const expiryDate = specialty.expiry_date.id(expiryDateId);
        if (!expiryDate) {
            return res.status(404).json({ message: 'Expiry Date not found' });
        }
        res.json(expiryDate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin một expiry date trong một specialty theo ID
exports.updateExpiryDateById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const expiryDateId = req.params.expiryDateId;
        const updatedExpiryDate = req.body;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const expiryDate = specialty.expiry_date.id(expiryDateId);
        if (!expiryDate) {
            return res.status(404).json({ message: 'Expiry Date not found' });
        }
        expiryDate.set(updatedExpiryDate);
        await specialty.save();
        res.json({ message: 'Expiry Date updated successfully', expiryDate: expiryDate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xoá một expiry date trong một specialty theo ID
exports.deleteExpiryDateById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const expiryDateId = req.params.expiryDateId;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        specialty.expiry_date.pull(expiryDateId);
        await specialty.save();
        res.json({ message: 'Expiry Date deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
