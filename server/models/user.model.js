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
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 6
    },
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;