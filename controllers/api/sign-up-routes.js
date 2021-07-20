const router = require('express').Router();
const { User, Location } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.get('/', async (req, res) => {
    try{
      const locationData = await Location.findAll({
        attributes: ['id','city', 'state'] 
      });
      res.status(200).json(locationData);
      console.log('Locations:', locationData);
    } catch (err) {
      res.status(400).json
    }
});

  module.exports = router;