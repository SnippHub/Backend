const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Joi = require('joi');
const Promise = require('bluebird');
const Schema = mongoose.Schema;

const passwordValidation = require('../validators/user');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',

    passwordValidator(password, cb) {
        var {
            error
        } = Joi.validate(password, passwordValidation.registerUser.body.password);

        cb(error);
    }
});

Promise.promisifyAll(UserSchema.methods);

const User = mongoose.model('User', UserSchema);
Promise.promisifyAll(User);

module.exports = User;