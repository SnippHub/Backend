const appName = 'SnippHub';

module.exports = {
    authenticator: {
        jwtOptions: {
            expiresIn: '1 day',
            audience: appName,
            issuer: appName
        },
        secret: 'Das ist ein Test Secret'
    }
};