const router = require('express').Router();
let Media = require('../models/media.model');

router.get('/', (req, res) => {
    Media.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const link = req.body.link;
    const path = req.body.path;
    const newMedia = new Media({
        link,
        path
    });

    newMedia.save()
        .then(()=> res.json('Video added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    Media.findByIdAndDelete(req.params.id)
        .then(() => res.json('Video deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err))
});
module.exports = router;