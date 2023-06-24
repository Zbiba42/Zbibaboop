const User = require('../models/user')
const FriendRequest = require('../models/friendRequest')
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
    )
    if (id === req.payload.id) {
      query = User.findOne({ _id: id }, { Verified: 0, Password: 0 }).populate(
        'notifications'
      )
    }

    const user = await query

    res.status(200).json({ succes: true, data: user })
  } catch (error) {
    console.log(error)
    res.status(400).json({ succes: false, error: error.message })
  }
}

const checkUsersRelation = async (req, res) => {
  const user1 = await User.findOne({ _id: req.query.user1 }).lean()
  const user2 = req.query.user2
  const alreadySent = await FriendRequest.exists({
    sender: user1._id,
    Receiver: user2,
  })
  const alreadyReceived = await FriendRequest.exists({
    sender: user2,
    Receiver: user1._id,
  })

  if (alreadySent) {
    res.status(200).json({ succes: true, data: 'already sent' })
    return
  }
  if (alreadyReceived) {
    res.status(200).json({ succes: true, data: 'already Received' })
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

module.exports = { getUser, updateUser, checkUsersRelation }
