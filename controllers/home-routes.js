const router = require('express').Router();

router.get('/', async (req, res) => {
    try{
        res.render('homepage-details');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try{
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try{
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try{
        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;