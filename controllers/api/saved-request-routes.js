const router = require('express').Router();
const { SavedRequest } = require('../../models');
const { Request } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    try {
        const savedReqData = await SavedRequest.create({
            user_id: req.session.user_id,
            request_id: req.body.request_id
        });

        res.status(200).json(savedReqData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const savedRequestData = await SavedRequest.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{model: Request}]
        });
        res.status(200).json(savedRequestData);
        console.log('Saved Requests: ', savedRequestData);
    } catch (err) {
        res.status(400).json
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
        const savedReqData = await SavedRequest.destroy({
            where: {
              id:  req.params.id
            },
          });
      
          if (!savedReqData) {
            res.status(404).json({request: 'Failure'});
            return;
          }
      
          res.status(200).json(savedReqData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;