const router = require('express').Router();
let AuthorizedStudent = require('../models/authorizedStudent.model');

router.get('/', (req, res) => {
    AuthorizedStudent.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});
router.route('/add').post((req, res) => {
    const user = req.body.user;
    const newAuthorizedStudent = new AuthorizedStudent({
        user
    });

    newAuthorizedStudent.save()
        .then(()=> res.json('User Allowed access!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})
module.exports = router;