const Card = require('../models/card.model.js');
const Img = require('../models/img.model.js');

fs = require('fs-extra');
var path = require('path');

validate = (name, age, sex, bio) => {

    if (!name.match(/^([А-Яа-яA-Za-z]{1,20} ?){1,2}$/)) {
        return "Incorrect name.";
    }

    if (!['Мальчик', 'Девочка', 'Неизвестно'].includes(sex)) {
        return "Incorrect sex.";
    }

    if (!['0-2', '3-6', '7+'].includes(age)) {
        return "Incorrect age."
    }

    if (bio.length > 140) {
        return "Too long bio."
    }

    return false;
}

exports.create = (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({
            message: "Name cannot be empty."
        });
    }

    const name = req.body.name.trim();

    if (!req.body.sex) {
        return res.status(400).send({
            message: "Sex cannot be empty."
        });
    }

    if (!req.body.age) {
        return res.status(400).send({
            message: "Age cannot be empty."
        });
    }

    // Create a Card
    const card = new Card({
        name: name,
        sex: req.body.sex,
        age: req.body.age,
        bio: req.body.bio,
        photo: req.body.img_path,
        username: req.username
    });

    const mes = validate(name, req.body.age, req.body.sex, req.body.bio);

    if (mes) {
        return res.status(400).send({
            message: mes
        });
    };

    // Save Card in the database
    card.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the card."
            });
        });
};

exports.uploadPhoto = (req, res) => {
    if (req.file) {
        var new_img = new Img;
        new_img.filename = req.file.filename;
        new_img.img.data = fs.readFileSync(req.file.path)
        new_img.img.contentType = req.file.mimetype;
        new_img.save();
        res.send({ message: req.file.filename });
    }
    else {
        res.send({ message: "" });
    }
};

exports.getPhoto = (req, res) => {
    Img.findOne({ 'filename': req.params.photoId })
        .then(photo => {
            res.contentType(photo.img.contentType);
            res.send(photo);
        }).catch(err => res.status(404).send(''));
};

exports.findAll = (req, res) => {
    Card.find({ 'username': req.username })
        .then(cards => {
            res.send(cards);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks."
            });
        });
};

exports.getAll = (req, res) => {
    Card.find({})
        .then(cards => {
            res.send(cards);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks."
            });
        });
};

exports.findOne = (req, res) => {
    Card.findById(req.params.cardId)
        .then(card => {
            if (!card) {
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            }
            res.send(card);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            }
            return res.status(500).send({
                message: "Error retrieving card with id " + req.params.cardId
            });
        });
};

exports.update = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name cannot be empty."
        });
    }

    const name = req.body.name.trim();

    if (!req.body.sex) {
        return res.status(400).send({
            message: "Sex cannot be empty."
        });
    }
    if (!req.body.age) {
        return res.status(400).send({
            message: "Age cannot be empty."
        });
    }

    const mes = validate(name, req.body.age, req.body.sex, req.body.bio);

    if (mes) {
        return res.status(400).send({
            message: mes
        });
    };

    // Find task and update it with the request body
    Card.findByIdAndUpdate(req.params.cardId, {
        name: name,
        sex: req.body.sex,
        age: req.body.age,
        bio: req.body.bio,
        photo: req.body.photo
    })
        .then(card => {
            if (!card) {
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            }
            res.send(card);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            }
            return res.status(500).send({
                message: "Error updating card with id " + req.params.cardId
            });
        });
};

exports.delete = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
        .then(card => {
            if (!card) {
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            }
            res.send({ message: "Card deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Card not found with id " + req.params.cardId
                });
            }
            return res.status(500).send({
                message: "Could not delete card with id " + req.params.cardId
            });
        });
};

exports.deleteAll = (req, res) => {
    Card.remove({})
        .then(card => {
            res.send({ message: "Cards deleted successfullly." });
        }).catch(err => {
            return res.status(500).send({
                message: "Couldn't delete cards."
            });
        });
};
