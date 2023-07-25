const mongoose = require('mongoose')

const ReactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  reaction: {
    type: string,
    enum: [
      'uwu',
      'like',
      'love',
      'hate',
      'kys',
      'remove some of ur ribs an suck ur cock',
      'femboy',
    ],
  },
})
