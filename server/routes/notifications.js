const router = require('express').Router();
let Notification = require('../models/notification.model');

router.get('/', (req, res) => {
    Notification.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.post('/add',(req, res) => { 
    const user = req.body.user;
    const lessonId = req.body.lessonId;
    const lessonTitle = req.body.lessonTitle;
    const action = req.body.action;
    const newNotification = new Notification({
        user,
        lessonId,
        lessonTitle,
        action
    });

    newNotification.save()
        .then(()=> res.json('notification added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    Notification.findByIdAndDelete(req.params.id)
        .then(() => res.json('Notification deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err))
});
module.exports = router;