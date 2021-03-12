const router = require('express').Router();
let Timeline = require('../models/timeline.model');

router.get('/', (req, res) => {
    Timeline.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const link = req.body.link;
    const userId = req.body.userId;
    const newTimelinePost = new Timeline({
        userId,
        link
    });

    newTimelinePost.save()
        .then(()=> res.json('Timeline post added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

router.get('/:id', (req, res) => {
    Timeline.findById(req.params.id)
        .then(qst => res.json(qst))
        .catch(err=> res.status(400).json('Error: ' + err))
});

module.exports = router;