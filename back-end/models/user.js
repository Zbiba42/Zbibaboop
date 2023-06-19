const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
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
  ProfilePath: {
    type: String,
    default: '/uploads/global/NoProfile.png',
  },
  CoverPath: {
    type: String,
    default: '/uploads/global/NoCover.png',
  },
  bio: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    enum: ['male', 'female', ''],
    default: '',
  },
  Work: {
    type: String,
    default: '',
  },
  College: {
    type: String,
    default: '',
  },
  HighSchool: {
    type: String,
    default: '',
  },
  Country: {
    type: String,
    default: '',
  },
  City: {
    type: String,
    default: '',
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  friendRequestsSent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FriendRequest',
    },
  ],
  friendRequestsReceived: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FriendRequest',
    },
  ],
})

module.exports = mongoose.model('User', UserSchema)
