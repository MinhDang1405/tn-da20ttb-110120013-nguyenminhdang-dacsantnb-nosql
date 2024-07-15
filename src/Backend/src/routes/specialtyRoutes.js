const express = require('express');
const router = express.Router();
const specialtyController = require('../controllers/specialtyController');

router.post('/', specialtyController.createSpecialty);

router.get('/', specialtyController.getAllSpecialties);

router.get('/names', specialtyController.getSpecialtyNames);

router.get('/:id', specialtyController.getSpecialtyById);

router.get('/', specialtyController.getSpecialtiesByProvince);

router.put('/:id', specialtyController.updateSpecialtyById);

router.delete('/:id', specialtyController.deleteSpecialtyById);

router.post('/delete-multiple', specialtyController.deleteMultipleSpecialties);

router.delete('/:specialtyId/category/:categoryId', specialtyController.deleteCategoryFromSpecialty);

router.put('/:specialtyId/category/:categoryId', specialtyController.updateCategory);

module.exports = router;
