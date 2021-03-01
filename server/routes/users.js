const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

router.route('/').get((req, res) => {
    User.find()
        .then(usr => res.json(usr))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const { fullname, password: plainTextPassword } = req.body;
    if (!fullname || typeof fullname !== 'string') {
		return res.json({ status: 'error', error: 'Invalid name' })
	}
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}
    if (plainTextPassword.length < 5) {
		return res.json({
			status: 'Error',
			error: 'Password is too small. It should be atleast 6 characters'
		})
	}
    const password = bcrypt.hash(plainTextPassword, 10)
    try {
		const response = User.create({
			fullname,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'User already exists' })
		}
		throw error
	}

	res.json({ status: 'ok' })
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

router.route('/login').post((req, res) => {
	const { email, password } = req.body;
	const user = User.findOne({ email }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (bcrypt.compare(password, user.password)) {
		// the username, password combination is successful
        const token = jwt.sign(
			{
				id: user._id,
				email: user.email
			},
			JWT_SECRET
		)
        return res.json({ status: 'ok', data: token })
	}
    res.json({ status: 'error', error: 'Invalid username/password' })
})

module.exports = router;