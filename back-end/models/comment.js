const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  onPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: false,
  },
  isReply: {
    type: Boolean,
    default: false,
  },
  onComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction',
      required: false,
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

module.exports = mongoose.model('Comment', CommentSchema)
