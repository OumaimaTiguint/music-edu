const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = Schema({
  lessonId: { type: String, required: true },
  filePath: { type: String, required: true },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;