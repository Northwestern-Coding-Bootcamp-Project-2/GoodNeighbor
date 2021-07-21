const router = require('express').Router();
const withAuth = require('../utils/auth');
//New added on the bottom 
const { Request } = require('../models');
const { User } = require('../models');


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

//All new stuff here
router.get('/dashboard', withAuth, async (req, res) => {
        const currId = req.session.user_id;
    try{
        const dashboardRequestData = await Request.findAll({
            where: {poster_id: currId},
        });
        const dashboardRequests = dashboardRequestData.map((dashboard) => dashboard.get ({ plain: true }));

        const savedDashboardRequestData = await Request.findAll({
            where: {user_id: currId},
        });
        const savedDashboardRequests = savedDashboardRequestData.map((dashboard) => dashboard.get ({ plain: true }));

        res.render('dashboard', {
            dashboardRequests,
            logged_in: req.session.logged_in
        })
    } catch (err){
        res.status(500).json(err);
    }
});

/*
router.get('/dashboard', withAuth, async (req, res) => {
    try{
        const currId = req.session.user_id;
        console.log('CURRENT ID', currId);
        const userInfoData = await User.findOne({ 
            where: { id: currId }
        });
        const userInfo = userInfoData.map((user) => user.get ({ plain: true }));


        res.render('dashboard', {
            userInfo,
            logged_in: req.session.logged_in
        })
    } catch (err){
        res.status(500).json(err);
    }
});
*/

module.exports = router;
