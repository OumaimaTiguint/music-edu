const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 5
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 6
    },
    cpassword: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 6
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;