const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    name: String,
    sex: String,
    age: String,
    bio: String,
    photo: String,
    username: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Card', CardSchema);