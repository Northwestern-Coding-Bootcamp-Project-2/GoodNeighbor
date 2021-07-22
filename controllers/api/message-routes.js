
const router = require('express').Router();
const { User } = require('../../models')
const { Message } = require('../../models')
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const messageData = await Message.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  

      const messages = messageData.map((messages) => messages.get({ plain: true }));
  
      res.render('messages', { 
        messages, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/:id', withAuth, async (req, res) => {
    try {
        const messageData = await Message.findOne({
          where: {
            id: req.params.id
          }
                });

        const message = messageData.get({ plain: true });

        res.render('indivMessage', {
            ...message,
            logged_in: req.session.logged_in        
          });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const newMessage = await Message.update({
          read: true,
          where: {
            id:  req.params.id
          },
        });
    
        res.status(200).json(newMessage);
      } catch (err) {
        res.status(400).json(err);
      }
    });

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const messageData = await Message.destroy({
        where: {
          id:  req.params.id
        },
      });
  
      if (!messageData) {
        res.status(404).json({message: 'Failure'});
        return;
      }
  
      res.status(200).json(messageData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  try {
    const messageData = await Message.create({
      title: req.body.title,
      text: req.body.text,
      image_link: req.body.image_link,
      sender_id: req.session.user_id,
      recipient_id: req.body.recipient_id
    });
      res.status(200).json(messageData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;