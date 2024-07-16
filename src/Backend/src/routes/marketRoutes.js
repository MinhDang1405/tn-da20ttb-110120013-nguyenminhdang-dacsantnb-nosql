const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

router.post('/:id/market', marketController.createMarket);

router.get('/:id/market', marketController.getAllMarkets);

router.get('/:id/market/:marketId', marketController.getMarketById);

router.put('/:id/market/:marketId', marketController.updateMarketById);

router.delete('/:id/market/:marketId', marketController.deleteMarketById);

module.exports = router;
