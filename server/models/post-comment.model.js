const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postCommentSchema = new Schema({
    postId: {
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

const PostComment = mongoose.model('PostComment', postCommentSchema);

module.exports = PostComment;