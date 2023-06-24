const mongoose = require('mongoose')
const NotificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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
    default: 'unread',
  },
})

module.exports = mongoose.model('Notification', NotificationSchema)
