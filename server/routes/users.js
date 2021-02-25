const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(usr => res.json(usr))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const newUser = new User({
        fullname,
        email,
        password,
        cpassword
    });

    newUser.save()
        .then(()=> res.json('User added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(u => {
            u.fullname = req.body.fullname;
            u.email = req.body.email;
            u.password = req.body.password;
            u.cpassword = req.body.cpassword;

            u.save()
                .then(()=> res.json('User updated!'))
                .catch((err)=> res.status(400).json('Error: ' + err))
        })
        .catch(err=> res.status(400).json('Error: ' + err))
});

module.exports = router;