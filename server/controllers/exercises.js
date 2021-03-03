const Exercise = require('../models/exercise');

exports.getExercises = async (req, res) => {
  const exercises = await Exercise.find();
  res.status(200).json({ exercises });
};

exports.postExercise = async (req, res) => {
  const { name } = req.body;
  const filePath = 'http://localhost:5000/exercises/' + req.file.filename;
  const exercise = new Exercise({
    name,
    filePath,
  });
  const createdExercise = await exercise.save();
  res.status(201).json({
    exercise: {
      ...createdExercise._doc,
    },
  });
};