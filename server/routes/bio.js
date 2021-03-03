const router = require('express').Router();
let Bio = require('../models/bio.model');

router.get('/', (req, res) => {
    Bio.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;