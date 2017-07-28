const express = require('express');

const router = express.Router();

router.get('/:id', async(req, res, next) => {
    // try {
    //     var snippet = await Snippet.findByIdAsync(req.params.id);

    //     res.json(snippet);
    // } catch (err) {
    //     next(err);
    // }
});

module.exports = router;