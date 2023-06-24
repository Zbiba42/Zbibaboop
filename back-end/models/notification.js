const mongoose = require('mongoose')
const NotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ['read', 'unread'],
    default: 'read',
  },
})

module.exports = mongoose.model('Notification', NotificationSchema)
