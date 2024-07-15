const Specialty = require('../models/Specialty');

// Tạo một market mới
exports.createMarket = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const market = req.body;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        specialty.market.push(market);
        await specialty.save();
        res.status(201).json({ message: 'Market created successfully', market: market });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy tất cả các markets của một specialty
exports.getAllMarkets = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.json(specialty.market);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin một market trong một specialty theo ID
exports.getMarketById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const marketId = req.params.marketId;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const market = specialty.market.id(marketId);
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }
        res.json(market);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin một market trong một specialty theo ID
exports.updateMarketById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const marketId = req.params.marketId;
        const updatedMarket = req.body;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const market = specialty.market.id(marketId);
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }
        market.set(updatedMarket);
        await specialty.save();
        res.json({ message: 'Market updated successfully', market: market });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xoá một market trong một specialty theo ID
exports.deleteMarketById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const marketId = req.params.marketId;
        const specialty = await Specialty.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        specialty.market.pull(marketId);
        await specialty.save();
        res.json({ message: 'Market deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
