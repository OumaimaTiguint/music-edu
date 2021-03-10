const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.route('/').get((req, res) => {
    User.find()
        .then(usr => res.json(usr))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        fullname,
        email,
		password
    });

    newUser.save()
        .then(()=> res.json('User added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

router.post('/login', async(req, res) => {
    try {
        const fullname = req.body.fullname;
        const password = req.body.password;
	    const user = await User.findOne({ fullname: fullname }).lean()

	    if (!user) {
		    res.json({ status: 'error', error: 'Invalid name/password' })
            return;
	    }
	    if (bcrypt.compare(password, user.password)) { 
            // Create token
            const token = jwt.sign(
                { 
                    _id: user._id,
                    fullname: user.fullname
                }, 
                process.env.TOKEN_SECRET
            )
            res.header('token', token)
            res.header("Access-Control-Expose-Headers", "token")
            return res.json({ status: 'ok', data: token })
        } else {
            res.json({ status: 'error', error: 'Invalid username/password' })
        }
    }
    catch(e) {
        console.log(e)
    }
	
})

router.route('/delete/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err))
});

module.exports = router;