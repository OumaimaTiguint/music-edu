const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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
        minLength: 2
    }
},
{
    timestamps: false
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;