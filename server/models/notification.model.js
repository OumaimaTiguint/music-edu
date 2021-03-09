const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = Schema({
  user: { type: String, required: true },
  lessonId: { type: String, required: true },
  lessonTitle: { type: String, required: true },
  action: { type: String, required: true }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;