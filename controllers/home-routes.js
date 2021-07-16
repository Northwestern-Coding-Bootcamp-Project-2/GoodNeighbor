const router = require('express').Router();

router.get('/', async (req, res) => {
    try{
        res.render('layouts/main');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;