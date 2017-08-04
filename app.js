const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const auth = require('./libs/authenticator');
const indexRoute = require('./routes/index');
const userRoute = require('./routes/user');
const snippetsRoute = require('./routes/snippets');

const app = express();

initExpressApp(app);

function initExpressApp(app) {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    initRoutes(app);
}

function initRoutes(app) {
    app.use('/', indexRoute);
    app.use('/user', auth.validateRequest(), userRoute);
    app.use('/snippets', auth.validateRequest(), snippetsRoute);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.json(res.locals.error);
    });
}

module.exports = app;