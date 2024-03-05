// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true } // Ссылка на изображение
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
