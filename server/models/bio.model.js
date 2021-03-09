const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bioSchema = new Schema({
    eng: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    ita: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    ger: {
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

const Bio = mongoose.model('Bio', bioSchema);

module.exports = Bio;