const Card = require('../models/card.model.js');

exports.create = (req, res) => {

    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Description cannot be empty."
        });
    }

    // Create a Card
    const card = new Card({
        name: req.body.name,
        sex: req.body.sex,
        age: req.body.age,
        bio: req.body.bio,
        username: req.username
    });

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
    // Validate Request
    if (!req.body.description) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }

    // Find task and update it with the request body
    Card.findByIdAndUpdate(req.params.cardId, {
        description: req.body.description
    })
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.cardId
                });
            }
            res.send(task);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.cardId
                });
            }
            return res.status(500).send({
                message: "Error updating task with id " + req.params.cardId
            });
        });
};

exports.delete = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.cardId
                });
            }
            res.send({ message: "Task deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.cardId
                });
            }
            return res.status(500).send({
                message: "Could not delete task with id " + req.params.cardId
            });
        });
};

exports.deleteAll = (req, res) => {
    Card.remove({})
        .then(task => {
            res.send({ message: "Tasks deleted successfullly." });
        }).catch(err => {
            return res.status(500).send({
                message: "Couldn't delete tasks."
            });
        });
};
