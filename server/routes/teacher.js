const router = require('express').Router();
let Teacher = require('../models/teacher.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.route('/').get((req, res) => {
    Teacher.find()
        .then(t => res.json(t))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const password = req.body.password;
    const newTeacher = new Teacher({
        fullname,
        password
    });

    newTeacher.save()
        .then(()=> res.json('User added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

router.post('/login', async(req, res) => {
    try {
        const fullname = req.body.fullname;
        const password = req.body.password;
	    const teacher = await Teacher.findOne({ fullname: fullname }).lean()

	    if (!teacher) {
		    res.json({ status: 'error', error: 'Invalid name/password' })
            return;
	    }
	    if (bcrypt.compare(password, teacher.password)) { 
            // Create token
            const token = jwt.sign(
                { 
                    _id: teacher._id,
                    fullname: teacher.fullname
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

module.exports = router;