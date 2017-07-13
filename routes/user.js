const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.get('/profile', async(req, res, next) => {
    try {
        var user = await User.findByIdAsync(req.user.sub, 'isAdmin name');

        res.json({
            isAdmin: user.isAdmin,
            name: user.name
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;