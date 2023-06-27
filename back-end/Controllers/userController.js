const User = require('../models/user')
const FriendRequest = require('../models/friendRequest')
const Notification = require('../models/notification')
const getUser = async (req, res) => {
  try {
    const id = req.query.id
    let query = User.findOne(
      { _id: id },
      {
        Email: 0,
        Verified: 0,
        Password: 0,
        friendRequestsReceived: 0,
        friendRequestsSent: 0,
        notifications: 0,
      }
    ).populate({
      path: 'friends',
      select: 'ProfilePath Fullname City Country',
    })
    if (id === req.payload.id) {
      query = User.findOne({ _id: id }, { Verified: 0, Password: 0 }).populate({
        path: 'friends',
        select: 'ProfilePath Fullname City Country',
      })
    }

    const user = await query
    res.status(200).json({ succes: true, data: user })
  } catch (error) {
    console.log(error)
    res.status(400).json({ succes: false, error: error.message })
  }
}

const checkUsersRelation = async (req, res) => {
  const user1 = req.query.user1
  const user2 = req.query.user2

  const alreadySent = await FriendRequest.exists({
    sender: user1,
    Receiver: user2,
  })
  const alreadyReceived = await FriendRequest.exists({
    sender: user2,
    Receiver: user1,
  })
  const user = await User.findOne({ _id: user1, friends: { $in: [user2] } })
  const isFriends = user !== null
  if (alreadySent) {
    res.status(200).json({ succes: true, data: 'already sent' })
    return
  }
  if (alreadyReceived) {
    res.status(200).json({ succes: true, data: 'already Received' })
    return
  }
  if (isFriends) {
    res.status(200).json({ succes: true, data: 'friends' })
    return
  }
  res.status(200).json({ succes: true, data: 'none' })
}

const updateUser = async (req, res) => {
  try {
    const userId = req.body.id
    const data = req.body

    delete data.id
    if (req.files && req.files['ProfilePath']) {
      data.ProfilePath = '/' + req.files['ProfilePath'][0].path
    }
    if (req.files && req.files['CoverPath']) {
      data.CoverPath = '/' + req.files['CoverPath'][0].path
    }
    await User.updateOne({ _id: userId }, data)
    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const removeFriend = async (req, res) => {
  const id = req.body.id
  console.log(id)
  console.log(req.payload.id)
  try {
    await User.updateOne({ _id: req.payload.id }, { $pull: { friends: id } })

    res.status(200).json({ succes: true, data: 'friend removed succesfully' })
  } catch (error) {
    res.status(400).json({ succes: false, data: error })
  }
}

const getNotifications = async (req, res) => {
  const id = req.query.id
  try {
    const { notifications } = await User.findOne(
      { _id: id },
      {
        notifications: 1,
      }
    ).populate({
      path: 'notifications',
    })
    res.status(200).json({ succes: true, data: notifications })
  } catch (error) {
    res.status(400).json({ succes: false, data: error })
  }
}

const readNtofication = async (req, res) => {
  const { _id } = req.body.notif
  try {
    await Notification.updateOne({ _id: _id }, { status: 'read' })
    res
      .status(200)
      .json({ succes: true, data: 'notification read succesfully' })
  } catch (error) {
    res.status(400).json({ succes: false, data: error })
  }
}

const removeNtofication = async (req, res) => {
  const { _id } = req.body.notif
  try {
    await User.updateOne(
      { _id: req.payload.id },
      { $pull: { notifications: _id } }
    )
    await Notification.deleteOne({ _id: _id })
    res
      .status(200)
      .json({ succes: true, data: 'notification removed succesfully' })
  } catch (error) {
    res.status(400).json({ succes: false, data: error })
  }
}
module.exports = {
  getUser,
  updateUser,
  checkUsersRelation,
  removeFriend,
  getNotifications,
  readNtofication,
  removeNtofication,
}
