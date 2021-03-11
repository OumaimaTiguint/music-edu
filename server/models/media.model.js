const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    link: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    path: {
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

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;