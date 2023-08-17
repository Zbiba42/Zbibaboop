const User = require('../models/user')
const Post = require('../models/post')

const search = async (req, res) => {
  try {
    const query = req.query.search
    const filter = req.query.filter
    const pageNumber = req.query.page
    const pageSize = 5
    if (filter == 'People') {
      const users = await User.find(
        {
          Fullname: { $regex: query, $options: 'i' },
        },
        {
          Email: 0,
          Verified: 0,
          Password: 0,
          friendRequestsReceived: 0,
          friendRequestsSent: 0,
          notifications: 0,
        }
      )
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
      res.status(200).json({
        success: true,
        data: users,
      })
    } else if (filter == 'Posts') {
      const posts = await Post.find({
        content: { $regex: query, $options: 'i' },
      })
        .populate({
          path: 'tags owner',
        })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
      res.status(200).json({
        success: true,
        data: posts,
      })
    } else {
      res.status(400).json({ succes: false, data: [] })
    }
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const searchFriends = async (req, res) => {
  const userId = req.payload.id
  const searchTerm = req.query.searchTerm
  try {
    const user = await User.findOne({ _id: userId }, { friends: 1 }).populate({
      path: 'friends',
      select: 'ProfilePath Fullname City Country',
    })

    const matchingFriends = user.friends.filter((friend) =>
      friend.Fullname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    res.status(200).json({ succes: true, data: matchingFriends })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
}
module.exports = { search, searchFriends }
