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
        var user = await db.user.findById(req.user.sub);

        if (!user) {
            return res.sendStatus(400);
        }

        var snippet = await user.createSnippet(req.body, {
            include: ['files', 'tags']
        })

        // var snippet = await db.snippet.build(req.body, {
        //     include: ['files', 'tags']
        // });


        res.json(snippet);
    } catch (err) {
        next(err);
    }
});


module.exports = router;