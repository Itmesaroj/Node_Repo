const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    age: { type: Number, required: true }
});

const productModel = mongoose.model('registers', productSchema);

module.exports = productModel;
