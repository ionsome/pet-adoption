const mongoose = require('mongoose');

const ImgSchema = mongoose.Schema({
    filename: { type: String, required: true, unique: true },
    img: { data: Buffer, contentType: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Img', ImgSchema);