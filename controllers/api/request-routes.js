const router = require('express').Router();
const { User } = require('../../models');
const { Request } = require('../../models')

// get and put verification conditional
// update and delete function

router.get('/', async (req, res) => {
    try {
    const requestData = await Request.findByPk({
        attributes: { exclude: ['password'] },
        
        include: [{ model: User}]
    })
    const request = requestData.get({ plain: true});

    res.render('request', {
        request,
        logged_in: true
    });
} catch (err) {
    res.status(500).json(err);
}
});