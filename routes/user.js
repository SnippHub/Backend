const express = require('express');

const router = express.Router();

router.get('/profile', async(req, res, next) => {
    // try {
    //     var user = await User.findByIdAsync(req.user.sub, 'isAdmin name tags');

    //     res.json({
    //         isAdmin: user.isAdmin,
    //         name: user.name,
    //         tags: user.tags
    //     });
    // } catch (err) {
    //     next(err);
    // }
});

module.exports = router;