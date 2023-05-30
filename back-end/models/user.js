const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  ImagePath: {
    type: String,
  },
  Fullname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    lowercase: true,
    required: 'Email address is required',
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please fill a valid email address',
    ],
  },
  Verified: { type: Boolean },
  Password: {
    type: String,
    trim: true,
    required: 'Password is required',
    min: [6, 'Password must be at least 6 characters'],
  },
})

module.exports = mongoose.model('User', UserSchema)
