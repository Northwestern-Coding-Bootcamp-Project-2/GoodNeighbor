const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try{
        res.render('homepage-details', {
            logged_in: req.session.logged_in
        });
        console.log(req.session.logged_in)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try{
        res.render('login', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try{
        res.render('signup', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try{
        res.render('dashboard', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;