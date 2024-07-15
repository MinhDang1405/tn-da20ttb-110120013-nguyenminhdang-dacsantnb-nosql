const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturerController');

router.post('/:id/manufacturer', manufacturerController.createManufacturer);

router.get('/:id/manufacturer', manufacturerController.getAllManufacturers);

router.get('/:id/manufacturer/:manufacturerId', manufacturerController.getManufacturerById);

router.put('/:id/manufacturer/:manufacturerId', manufacturerController.updateManufacturerById);

router.delete('/:id/manufacturer/:manufacturerId', manufacturerController.deleteManufacturerById);

module.exports = router;
