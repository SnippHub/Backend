const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const uuidv4 = require('uuid/v4');
const expressJwt = require('express-jwt');

Promise.promisifyAll(jwt);

const authConfig = require('../config').authenticator;

class Authenticator {
    constructor(authConfig) {
        this.options = authConfig.jwtOptions;
        this.secret = authConfig.secret;
    }

    async createToken(user) {
        var tokenObject = this.createUserTokenObject(user);
        var signedToken = await jwt.signAsync(tokenObject, this.secret, this.options);

        return signedToken;
    }

    async verifyToken(token) {
        var verifiedToken = await jwt.verifyAsync(token, this.secret, this.options);

        return verifiedToken;
    }

    createUserTokenObject(user) {
        return {
            sub: user.id,
            jti: uuidv4(),
            isAdmin: user.isAdmin,
            name: user.name
        }
    }

    validateRequest() {
        var {
            audience,
            issuer
        } = this.options;

        var options = {
            secret: this.secret,
            audience,
            issuer
        };

        return expressJwt(options);
    }
}

module.exports = new Authenticator(authConfig);