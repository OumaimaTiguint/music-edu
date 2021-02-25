const router = require('express').Router();
let Teacher = require('../models/teacher.model');

router.route('/').get((req, res) => {
    Teacher.find()
        .then(t => res.json(t))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newTeacher = new Teacher({
        email,
        password
    });

    newTeacher.save()
        .then(()=> res.json('User added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

module.exports = router;