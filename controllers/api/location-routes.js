// REQUEST SEARCHES, GET REQUESTS BASED ON LOCATION DATA

const router = require('express').Router();
const { Location } = require('../../models')
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const { Request } = require('../../models');

router.get('/:id', withAuth, async (req, res) =>{
    try {
      const locationData = await Request.findAll({
          where: {
            location_id: req.params.id
          },
          include: [{ model: User }, {model: Location}]
        });
  

      const location = locationData.map((location) => location.get({ plain: true }));
  
      res.render('location', { 
        location, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newLocation = await Location.create({
        ...req.body,
      });
  
      res.status(200).json(newLocation);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  module.exports = router;