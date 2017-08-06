const express = require('express');

const db = require('../models');

const router = express.Router();

router.get('/:id', async(req, res, next) => {
    try {
        var snippet = await db.snippet.findById(req.params.id);

        if (!snippet) {
            return res.sendStatus(404);
        }

        res.json(snippet);
    } catch (err) {
        next(err);
    }
});

router.get('/', async(req, res, next) => {
    try {
        var snippets = await db.snippet.findAll({
            where: {
                creatorId: req.user.sub
            }
        });

        res.json(snippets);
    } catch (err) {
        next(err);
    }
});

router.post('/', async(req, res, next) => {
    try {
        req.body.creatorId = req.user.sub;

        var snippet = await db.snippet.create(req.body, {
            include: ['files', 'tags']
        });

        res.json(snippet);
    } catch (err) {
        next(err);
    }
});


module.exports = router;