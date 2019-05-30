const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
    id: String,
    data: Binary
}, {
    timestamps: true
});

module.exports = mongoose.model('Photo', PhotoSchema);