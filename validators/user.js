const Joi = require('joi');

const registerUser = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{6,30}/).required(),
        name: Joi.string().min(3).required()
    }
}

// This may change after time.
const loginUser = {
    body: {
        email: registerUser.body.email,
        password: registerUser.body.password
    }
};

module.exports = {
    registerUser,
    loginUser
};