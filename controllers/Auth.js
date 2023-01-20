const db = require('../models')
import bcrypt from 'bcrypt';

const test = (req, res) => {
    res.json({
        status: 200,
        message: "Test controller for Auth successful.."
    });
}

const signup = (req, res) => {

/*
1. Validate values from request object
2. Check if account already exists
3. Generate hash salt with bcrypt
4. Hash req.password

*/

    // 1. Validate values from request object:
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: "All fields are required"
        });
    }

    // 2. Check if account already exists:
    db.User.findOne({email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(400).json({
            status: 400,
            message: "Something went wrong, please try again."
        })

        if (foundUser) return res.staus(400).json({
            status: 400,
            message: "Email has already been registered."
        });
    })

    // 3. Generate Hash Salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.status(400).json({
            status: 400,
            message: "Something went wrong, please try again."
        });

        // Hash req.password
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.status(400).json({
                status: 400,
                message: "Something went wrong, please try agian."
            });

            const { firstName, lastName, email } = req.body;

            const newUser = {
                firstName,
                lastName,
                email,
                password: hash
            };

            db.User.create(newUser, (err, createdUser) => {
                if (err) return res.status(400).json({
                    status: 400,
                    message: "Something went wrong, please try again."
                });

                res.status(201).json(createdUser);
            });
        });
    });
}

export { test, signup }