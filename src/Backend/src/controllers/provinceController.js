const Province = require('../models/Province');

exports.getProvinces = async (req, res) => {
    try {
        const provinces = await Province.find();
        res.status(200).json(provinces);
    } catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).json({ message: 'Error fetching provinces' });
    }
};
