const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  ],
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction',
      required: false,
    },
  ],
})

module.exports = mongoose.model('Post', PostSchema)
