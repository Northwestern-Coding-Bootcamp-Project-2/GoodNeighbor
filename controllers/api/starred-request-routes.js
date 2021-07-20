const router = require('express').Router();
const { StarredRequest } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const starredReqData = await StarredRequest.create({
            user_id: req.session.user_id,
            request_id: req.body.request_id
        });

        res.status(200).json(starredReqData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const starredRequestData = await StarredRequest.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        res.status(200).json(starredRequestData);
        console.log('Starred Requests: ', starredRequestData);
    } catch (err) {
        res.status(400).json
    }
});

module.exports = router;