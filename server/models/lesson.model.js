const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    content: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    level: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    exercises: {
        type: String,
        required: false,
        unique: false,
        trim: true,
        minLength: 2
    }
},
{
    timestamps: true
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;