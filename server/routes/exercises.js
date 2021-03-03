const express = require('express');

const exercisesController = require('../controllers/exercises');

const storage = require('../helpers/storage');

const router = express.Router();

router.get('/', exercisesController.getExercises);

router.post('/', storage, exercisesController.postExercise);

module.exports = router;