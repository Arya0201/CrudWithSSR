var userDB = require('../model/userModel');
var errorDB = require('../model/errorModel'); // Import the error log model

// create and save new user
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // new user
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    // save user in the database
    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            // Log the error to the error log database
            const errorLog = new errorDB({
                message: err.message,
                stackTrace: err.stack
            });
            errorLog.save(); // Save the error log
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });
}

// retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        userDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id " + id })
            })
    } else {
        userDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                // Log the error to the error log database
                const errorLog = new errorDB({
                    message: err.message,
                    stackTrace: err.stack
                });
                errorLog.save(); // Save the error log
                res.status(500).send({ message: err.message || "Error Occurred while retrieving user information" })
            })
    }
}

// Update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            // Log the error to the error log database
            const errorLog = new errorDB({
                message: err.message,
                stackTrace: err.stack
            });
            errorLog.save(); // Save the error log
            res.status(500).send({ message: "Error Update user information" })
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    userDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            // Log the error to the error log database
            const errorLog = new errorDB({
                message: err.message,
                stackTrace: err.stack
            });
            errorLog.save(); // Save the error log
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
