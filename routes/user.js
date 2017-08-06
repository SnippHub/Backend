const express = require('express');

const db = require('../models');

const router = express.Router();

router.get('/profile', async(req, res, next) => {
    try {
        var user = await db.user.findById(req.user.sub, {
            attributes: ['isAdmin', 'name', 'isEditor']
        });

        res.json(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;