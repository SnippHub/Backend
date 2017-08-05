const express = require('express');
const validate = require('express-validation')

const auth = require('../libs/authenticator');
const db = require('../models');
const userValidation = require('../validators/user');

const router = express.Router();

router.post('/login', validate(userValidation.loginUser), async(req, res, next) => {
    try {
        var {
            email,
            password
        } = req.body;

        var user = await User.findByUsernameAsync(email);

        if (user) {
            var passwordValid = await user.authenticateAsync(password);

            if (!passwordValid) {
                return res.sendStatus(400);
            }

            var token = await auth.createToken(user);

            res.json({
                token
            });
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        return next(err);
    }
});

router.post('/register', validate(userValidation.registerUser), async(req, res, next) => {
    try {
        var existingUser = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (existingUser) {
            return res.sendStatus(409);
        }

        var createdUser = await db.User.create(req.body);
        var token = await auth.createToken(createdUser);

        res.json({
            token
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;