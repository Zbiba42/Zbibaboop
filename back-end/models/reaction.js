const mongoose = require('mongoose')

const ReactionSchema = new mongoose.Schema({
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
  onComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  },
  reaction: {
    type: string,
    enum: [
      'Love',
      'like',
      'love',
      'Love',
      'kys',
      'remove some of ur ribs an suck ur cock',
      'femboy',
    ],
  },
})

module.exports = mongoose.model('Reaction', ReactionSchema)
