const db = require('../models')
import bcrypt from 'bcrypt';

const test = (req, res) => {
    res.json({
        status: 200,
        message: "Test controller for Auth successful.."
    });
}


// POST - Signup
const signup = (req, res) => {

/*
1. Validate values from request object
2. Check if account already exists
3. Generate hash salt with bcrypt
4. Hash req.password\
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

// POST Login - Create Session
const createSession = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 400,
            message: "All fields are required."
        });
    }

    db.User.findOne({email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });

        if (!foundUser) {
            return res.status(400).json({
                status: 400,
                message: "Username or password is incorrect, please try again."
            });
        }

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({
                status: 500,
                message: "Something went wrong, please try again."
            })

            if (isMatch) {
                req.session.loggedIn = true;
                req.session.currentUser = foundUser._id;
                return res.status(200).json({
                    status: 200,
                    data: {id: foundUser._id}
                });
            } else {
                return res.status(400).json({
                    status: 400,
                    message: "Username or password is incorrect."
                });
            }
        });
    });
}

// DELETE Logout - Delete Session
const deleteSession = (req, res) => {
    if (!req.session.currentUser) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized, please login and try again."
        });
    }

    req.session.destroy((err) => {
        if (err) return res.status(400).json({err});
        res.json({status: 200});
    });
}


export { test, signup, createSession, deleteSession }