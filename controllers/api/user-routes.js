
const router = require('express').Router();
const { User } = require('../../models');
const { Message } = require('../../models');
const { SavedRequest } = require('../../models');
const { Request } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },

            include: [{ model: Message }, { model: Request }, { model: SavedRequest }]
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        })

        const user = userData.get({ plain: true });

        res.render('user', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
        })

        const user = userData.get({ plain: true });

        res.render('user', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/profile', withAuth, async (req, res) => {
    try {
      const newUser = await User.update({
        ...req.body,
        where: {
          id:  req.session.user_id,
        },
      });
  
      res.status(200).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
router.delete('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id:  req.session.user_id,
    
        },
      });
  
      if (!userData) {
        res.status(404).json({message: 'Failure'});
        return;
      }
  
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;