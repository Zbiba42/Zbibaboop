const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  files: {
    type: Array,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

messageSchema.index({ sender: 1 })
messageSchema.index({ recipient: 1 })
messageSchema.index({ timestamp: -1 })

module.exports = mongoose.model('Message', messageSchema)
