const router = require('express').Router();
let PostComment = require('../models/post-comment.model');

router.get('/', (req, res) => {
    PostComment.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const postId = req.body.postId;
    const comment = req.body.comment;
    const user = req.body.user;
    const newPostComment = new PostComment({
        postId,
        comment,
        user
    });

    newPostComment.save()
        .then(()=> res.json('Comment added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

router.route('/delete/:id').delete((req, res) => {
    PostComment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err))
});

module.exports = router;