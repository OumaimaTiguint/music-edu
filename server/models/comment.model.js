const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    lessonId: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    comment: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    user: {
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

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;