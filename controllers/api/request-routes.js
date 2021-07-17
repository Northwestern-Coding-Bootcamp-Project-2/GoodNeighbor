const router = require('express').Router();
const { User } = require('../../models');
const { Request } = require('../../models')

// get and put verification conditional
// update and delete function

router.get('/', withAuth, async (req, res) => {
    try {
    const requestData = await Request.findAll({
        attributes: { exclude: ['password'] },
        
        include: [{ model: User}]
    })
    const request = requestData.get((request) => request.get({ plain: true}));

    res.render('request', {
        request,
        logged_in: true
    });
} catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const requestData = await Request.findByPk(req.params.id, {
            
            include: [{ model: User }]
        });

        const request = requestData.get({ plain: true });

        res.render('messages', {
            ...requests,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});