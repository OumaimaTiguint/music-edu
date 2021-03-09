const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorizedStudentSchema = new Schema({
    user: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    }
},
{
    timestamps: false
});

const AuthorizedStudent = mongoose.model('AuthorizedStudent', authorizedStudentSchema);

module.exports = AuthorizedStudent;