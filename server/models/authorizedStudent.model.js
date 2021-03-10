const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorizedStudentSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 2
    }
},
{
    timestamps: false
});

const AuthorizedStudent = mongoose.model('AuthorizedStudent', authorizedStudentSchema);

module.exports = AuthorizedStudent;