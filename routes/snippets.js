const express = require('express');
const sequelize = require('sequelize');
const _ = require('lodash');

const db = require('../models');

const router = express.Router();

router.get('/:id', async(req, res, next) => {
    try {
        var snippet = await db.snippet.findById(req.params.id, {
            include: ['tags', 'files']
        });

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
            },
            include: ['tags']
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

router.put('/:id', async(req, res, next) => {
    try {
        var snippet = await db.snippet.findById(req.params.id, {
            include: ['files', 'tags']
        });

        if (!snippet) {
            return res.sendStatus(404);
        }

        var transaction = await db.sequelize.transaction();

        try {
            await updateFiles(snippet.id, snippet.files, req.body.files, transaction);
            await updateTags(snippet.id, snippet.tags, req.body.tags, transaction);

            await snippet.update(req.body, {
                transaction: transaction
            });

            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }

        res.json(snippet);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async(req, res, next) => {
    try {
        var snippet = await db.snippet.findById(req.params.id);

        if (!snippet) {
            return res.sendStatus(404);
        }

        await snippet.destroy();

        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

async function updateFiles(snippetId, oldFiles, newFiles, transaction) {
    var filesToAdd = _.differenceBy(newFiles, oldFiles, 'id').map(file => {
        return {
            name: file.name,
            content: file.content,
            order: file.order,
            snippetId: snippetId
        }
    });

    var filesToDelete = _.differenceBy(oldFiles, newFiles, 'id').map(file => file.id);
    var filesToUpdate = _.intersectionBy(oldFiles, newFiles, 'id');

    var createPromise = db.file.bulkCreate(filesToAdd, {
        transaction: transaction
    });

    var destroyPromise = db.file.destroy({
        where: {
            id: {
                $in: filesToDelete
            }
        }
    }, {
        transaction: transaction
    });

    var updateFilePromises = filesToUpdate.map(file => {
        var updateContent = _.find(newFiles, {
            id: file.id
        });

        return file.update(updateContent, {
            transaction: transaction
        });
    });

    var updatePromise = Promise.all(updateFilePromises);

    await Promise.all([createPromise, destroyPromise, updatePromise]);
}

async function updateTags(snippetId, oldTags, newTags, transaction) {
    var tagsToAdd = _.differenceBy(newTags, oldTags, 'id').map(tag => {
        return {
            text: tag.text,
            snippetId: snippetId
        }
    });

    var tagsToDelete = _.differenceBy(oldTags, newTags, 'id').map(tag => tag.id);
    var tagsToUpdate = _.intersectionBy(oldTags, newTags, 'id');

    var createPromise = db.tag.bulkCreate(tagsToAdd, {
        transaction: transaction
    });

    var destroyPromise = db.tag.destroy({
        where: {
            id: {
                $in: tagsToDelete
            }
        }
    }, {
        transaction: transaction
    });

    var updateTagPromises = tagsToUpdate.map(tag => {
        var updateContent = _.find(newTags, {
            id: tag.id
        });

        return tag.update(updateContent, {
            transaction: transaction
        });
    });

    var updatePromise = Promise.all(updateTagPromises);

    await Promise.all([createPromise, destroyPromise, updatePromise]);
}

module.exports = router;