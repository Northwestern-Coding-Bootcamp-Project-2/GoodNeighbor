const router = require('express').Router();
const withAuth = require('../utils/auth');
//New added on the bottom 
const { Request, Message } = require('../models');
const { SavedRequest } = require('../models');
const { User } = require('../models');
// const sequelize = require('sequelize'); 
// const op = sequelize.Op;


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

router.get('/message', async (req, res) => {
    try{
        const receivedMsgRequestData = await Message.findAll({
            where: {recipient_id: req.session.user_id},
            include: [
                // {
                    // model: 
                    User,
                //     where: {
                //         id: {[op.col]: 'sender_id'}
                //     },
                //     required: true
                // }
            ]
        })
        const sentMsgRequestData = await Message.findAll({
            where: {sender_id: req.session.user_id},
            include: [User]
        })
        const recMsgData = receivedMsgRequestData.map((dashboard) => dashboard.get ({plain: true }));
        const sentMsgData = sentMsgRequestData.map((dashboard) => dashboard.get ({plain: true }));

        console.log("This is the received message data: ", recMsgData);
        console.log("This is the sent message data: ", sentMsgData);
        res.render('messages', {
            recMsgData,
            sentMsgData,
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

        const userRequestData = await User.findAll({
            where: {id:req.session.user_id}
        })

        const userData = userRequestData.map((dashboard) => dashboard.get ({plain: true }));

        const dashboardRequestData = await Request.findAll({
            where: {poster_id: currId},
        });
        const dashboardRequests = dashboardRequestData.map((dashboard) => dashboard.get ({ plain: true }));
        
        const savedDashboardRequestData = await SavedRequest.findAll({
            where: {user_id: currId},
            include: [Request]
        });
        
        
        const savedDashboardRequests = savedDashboardRequestData.map((dashboard) => dashboard.get ({ plain: true }));


        res.render('dashboard', {
            dashboardRequests,
            savedDashboardRequests,
            userData,
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
