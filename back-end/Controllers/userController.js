const User = require('../models/user')

const getUser = async (req, res) => {
  try {
    const id = req.query.id
    const user = await User.findOne(
      { _id: id },
      { Verified: 0, Password: 0, friendRequests: 0 }
    )
    res.status(200).json({ succes: true, data: user })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const checkUsersRelation = async (req, res) => {
  const user1 = await User.findOne({ _id: req.query.user1 }).populate([
    'friendRequestsSent',
    'friendRequestsReceived',
  ])
  const user2 = req.query.user2
  const alreadySent = user1.friendRequestsSent.some(
    (request) => request.Receiver.toString() === user2
  )
  const alreadyReceived = user1.friendRequestsReceived.some(
    (request) => request.sender.toString() === user2
  )
  if (user1.friends.includes(user2)) {
    res.status(200).json({ succes: true, data: 'friends' })
  } else {
    console.log('makaynch f firends')
  }

  if (alreadySent) {
    res.status(200).json({ succes: true, data: 'already sent' })
  }
  if (alreadyReceived) {
    res.status(200).json({ succes: true, data: 'already Received' })
  }
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
