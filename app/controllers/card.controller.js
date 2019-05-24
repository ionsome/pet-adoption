const Card = require('../models/card.model.js');

validate = (name, age, sex, bio) => {

    if (!name.match(/^(\w{2,10} ?){1,2}$/)) {
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

    // Create a Card
    const card = new Card({
        name: name,
        sex: req.body.sex,
        age: req.body.age,
        bio: req.body.bio,
        username: req.username
    });

    const mes = validate(name, req.body.sex, req.body.sex, req.body.bio)
    
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
                    message: "Task not found with id " + req.params.cardId
                });
            }
            res.send(card);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.cardId
                });
            }
            return res.status(500).send({
                message: "Error retrieving task with id " + req.params.cardId
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

    validate(name, req.body.sex, req.body.sex, bio).then((mes) => {
        if (mes) {
            return res.status(400).send({
                message: mes
            });
        };
    })

    // Find task and update it with the request body
    Card.findByIdAndUpdate(req.params.cardId, {
        name: name,
        sex: req.body.sex,
        age: req.body.age,
        bio: req.body.bio
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
