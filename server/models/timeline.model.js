const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timelineSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 2
    },
    link: {
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

const Timeline = mongoose.model('Timeline', timelineSchema);
module.exports = Timeline;