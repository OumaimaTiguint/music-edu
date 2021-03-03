const router = require('express').Router();
let Comment = require('../models/comment.model');

router.get('/', (req, res) => {
    Comment.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const lessonId = req.body.lessonId;
    const comment = req.body.comment;
    const user = req.body.user;
    const newComment = new Comment({
        lessonId,
        comment,
        user
    });

    newComment.save()
        .then(()=> res.json('Comment added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

module.exports = router;