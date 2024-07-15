const Specialty = require('../models/Specialty');

// Controller to create a new specialty
exports.createSpecialty = async (req, res) => {
    try {
        const specialty = new Specialty(req.body);
        await specialty.save();
        res.status(201).json(specialty);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to get all specialties
exports.getAllSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.find();
        res.json(specialties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to get a single specialty by ID
exports.getSpecialtyById = async (req, res) => {
    try {
        const specialty = await Specialty.findById(req.params.id);
        if (!specialty) {
            return res.status(404).json({ message: "Specialty not found" });
        }
        res.json(specialty);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Controller to update a specialty by ID
exports.updateSpecialtyById = async (req, res) => {
    try {
        await Specialty.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Specialty updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to delete a specialty by ID
exports.deleteSpecialtyById = async (req, res) => {
    try {
        await Specialty.findByIdAndDelete(req.params.id);
        res.json({ message: "Specialty deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Controller to delete multiple specialties by IDs
exports.deleteMultipleSpecialties = async (req, res) => {
    try {
        const { ids } = req.body;
        await Specialty.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Specialties deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteCategoryFromSpecialty = async (req, res) => {
    try {
        const { specialtyId, categoryId } = req.params;

        // Tìm và cập nhật đặc sản, loại bỏ danh mục có id là categoryId
        await Specialty.findByIdAndUpdate(specialtyId, {
            $pull: { category: { _id: categoryId } }
        });

        res.status(200).send({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send({ message: 'Error deleting category' });
    }
};
exports.updateCategory = async (req, res) => {
    try {
        const { specialtyId, categoryId } = req.params;
        const { name, specifications, storage_method, components } = req.body;

        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).send({ message: 'Specialty not found' });
        }

        const category = specialty.category.id(categoryId);
        if (!category) {
            return res.status(404).send({ message: 'Category not found' });
        }

        category.name = name;
        category.specifications = specifications;
        category.storage_method = storage_method;
        category.components = components;

        await specialty.save();

        res.status(200).send({ message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send({ message: 'Error updating category' });
    }
};

exports.getSpecialtyNames = async (req, res) => {
    try {
      const specialties = await Specialty.find({}, 'name');
      res.json(specialties);
    } catch (error) {
      console.error('Error fetching specialty names:', error);
      res.status(500).json({ error: 'Error fetching specialty names' });
    }
  };

  exports.getSpecialtiesByProvince = async (req, res) => {
    try {
        const { province } = req.query;
        const specialties = await Specialty.find({ province });
        res.status(200).json(specialties);
    } catch (error) {
        console.error('Error fetching specialties:', error);
        res.status(500).json({ message: 'Error fetching specialties' });
    }
};
