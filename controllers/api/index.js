const router = require('express').Router();
const userRoutes = require('./user-routes');
const messageRoutes = require('./message-routes');
const locationRoutes = require('./location-routes');
const requestRoutes = require('./request-routes');
const signupRoutes = require('./sign-up-routes');
const loginRoutes = require('./login-routes');

router.use('/users', userRoutes);
router.use('/request', requestRoutes);
router.use('/message', messageRoutes);
router.use('/location', locationRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);



module.exports = router;