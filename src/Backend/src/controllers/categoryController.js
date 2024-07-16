const Specialty = require('../models/Specialty');

// Tạo một category mới
exports.createCategory = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const category = req.body;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        specialty.category.push(category);
        await specialty.save();
        res.status(201).json({ message: 'Category created successfully', category: category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả các category của một specialty
exports.getAllCategories = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.json(specialty.category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin một category trong một specialty theo ID
exports.getCategoryById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const categoryId = req.params.categoryId;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const category = specialty.category.id(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin một category trong một specialty theo ID
exports.updateCategoryById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const categoryId = req.params.categoryId;
        const updatedCategory = req.body;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const category = specialty.category.id(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.set(updatedCategory);
        await specialty.save();
        res.json({ message: 'Category updated successfully', category: category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xoá một category trong một specialty theo ID
exports.deleteCategoryById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const categoryId = req.params.categoryId;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        specialty.category.pull(categoryId); // Sử dụng pull để xoá category từ mảng
        await specialty.save();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller để xoá nhiều category
exports.deleteMultipleCategories = async (req, res) => {
    try {
        const { specialtyId } = req.params;
        const { categoryIds } = req.body;

        // Kiểm tra nếu không có categoryIds hoặc không phải là một mảng
        if (!categoryIds || !Array.isArray(categoryIds)) {
            return res.status(400).json({ message: 'Invalid categoryIds' });
        }

        // Tìm và cập nhật đặc sản, loại bỏ các category có id trong danh sách categoryIds
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }

        categoryIds.forEach(categoryId => {
            specialty.category.id(categoryId).remove();
        });

        await specialty.save();

        res.status(200).send({ message: 'Categories deleted successfully' });
    } catch (error) {
        console.error('Error deleting categories:', error);
        res.status(500).send({ message: 'Error deleting categories' });
    }
};