const express = require('express');
const router = express.Router();
const expiryDateController = require('../controllers/expiryDateController');

router.post('/:id/expiry_date', expiryDateController.createExpiryDate);

router.get('/:id/expiry_date', expiryDateController.getAllExpiryDates);

router.get('/:id/expiry_date/:expiryDateId', expiryDateController.getExpiryDateById);

router.put('/:id/expiry_date/:expiryDateId', expiryDateController.updateExpiryDateById);

router.delete('/:id/expiry_date/:expiryDateId', expiryDateController.deleteExpiryDateById);

module.exports = router;
