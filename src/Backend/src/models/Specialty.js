const mongoose = require('mongoose');


const marketSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    price: String
});

const manufacturerSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
});

const expiry_dateSchema = new mongoose.Schema({
    name: String,
    production_date: String,
    expiration_date: String,
});

const categorySchema = new mongoose.Schema({
    name: String,
    specifications: String,
    storage_method: String,
    components: String,
});

const specialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    province: String,
    manufacturer: [manufacturerSchema],
    category: [categorySchema],
    flavor: String,
    description: String,
    img: String,
    market: [marketSchema],
    instructions: String,
    food_safety_standard: String,
    expiry_date: [expiry_dateSchema]
});

const Specialty = mongoose.model('Specialty', specialtySchema);

module.exports = Specialty;
