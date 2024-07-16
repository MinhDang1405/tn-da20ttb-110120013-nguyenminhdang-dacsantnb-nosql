const Specialty = require('../models/Specialty');

// Tạo một manufacturer mới
exports.createManufacturer = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const manufacturer = req.body;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        specialty.manufacturer.push(manufacturer);
        await specialty.save();
        res.status(201).json({ message: 'Manufacturer created successfully', manufacturer: manufacturer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả các manufacturer của một specialty
exports.getAllManufacturers = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.json(specialty.manufacturer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin một manufacturer trong một specialty theo ID
exports.getManufacturerById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const manufacturerId = req.params.manufacturerId;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const manufacturer = specialty.manufacturer.id(manufacturerId);
        if (!manufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }
        res.json(manufacturer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin một manufacturer trong một specialty theo ID
exports.updateManufacturerById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const manufacturerId = req.params.manufacturerId;
        const updatedManufacturer = req.body;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const manufacturer = specialty.manufacturer.id(manufacturerId);
        if (!manufacturer) {
            return res.status(404).json({ message: 'Manufacturer not found' });
        }
        manufacturer.set(updatedManufacturer);
        await specialty.save();
        res.json({ message: 'Manufacturer updated successfully', manufacturer: manufacturer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xoá một manufacturer trong một specialty theo ID
exports.deleteManufacturerById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const manufacturerId = req.params.manufacturerId;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        specialty.manufacturer.pull(manufacturerId);
        await specialty.save();
        res.json({ message: 'Manufacturer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
