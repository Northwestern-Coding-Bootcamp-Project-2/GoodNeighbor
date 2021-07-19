const router = require('express').Router();
const { User } = require('../../models');
const { Request } = require('../../models');
const withAuth = require('../../utils/auth');

// get and put verification conditional
// update and delete function

router.post('/', async (req, res) => {
  try {
    const requestData = await Request.create({
      title: req.body.title,
      text: req.body.text,
      image_link: req.body.image_link,
      poster_id: 4,
      location_id: req.body.location_id
    });
      res.status(200).json(requestData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const requestData = await Request.findByPk(req.params.id, {
            
            include: [{ model: User }]
        });

        const request = requestData.get({ plain: true });

        res.render('request', {
            ...request,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const newRequest = await Request.update({
        ...req.body,
        where: {
          id:  req.params.id,
        }
      });
  
      res.status(200).json(newRequest);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const requestData = await Request.destroy({
            where: {
              id:  req.params.id
            },
          });
      
          if (!requestData) {
            res.status(404).json({request: 'Failure'});
            return;
          }
      
          res.status(200).json(requestData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;

