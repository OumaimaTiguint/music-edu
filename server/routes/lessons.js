const router = require('express').Router();
let Lesson = require('../models/lesson.model');

router.route('/').get((req, res) => {
    Lesson.find()
        .then(l => res.json(l))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const level = req.body.level;
    const exercises = req.body.exercises;
    const newLesson = new Lesson({
        title,
        content,
        level,
        exercises
    });

    newLesson.save()
        .then(()=> res.json('Lesson added!'))
        .catch((err)=> res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Lesson.findById(req.params.id)
        .then(qst => res.json(qst))
        .catch(err=> res.status(400).json('Error: ' + err))
});

router.route('/delete/:id').delete((req, res) => {
    Lesson.findByIdAndDelete(req.params.id)
        .then(() => res.json('Lesson deleted!'))
        .catch(err=> res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req, res) => {
    Lesson.findById(req.params.id)
        .then(l => {
            l.title = req.body.title;
            l.content = req.body.content;
            l.level = req.body.level;
            l.exercises = req.body.exercises;

            l.save()
                .then(()=> res.json('Lesson updated!'))
                .catch((err)=> res.status(400).json('Error: ' + err))
        })
        .catch(err=> res.status(400).json('Error: ' + err))
});

module.exports = router;