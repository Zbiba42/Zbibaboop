const User = require('../models/user')

const search = async (req, res) => {
  try {
    const query = req.query.search
    const page = parseInt(req.query.page) || 1 // Current page number (default: 1)
    const limit = parseInt(req.query.limit) || 10 // Results per page (default: 10)
    const skip = (page - 1) * limit // Number of results to skip
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
      .skip(skip)
      .limit(limit)
    const totalUsers = await User.countDocuments({
      Fullname: { $regex: query, $options: 'i' },
    })

    const totalPages = Math.ceil(totalUsers / limit)
    res.status(200).json({
      success: true,
      data: users,
      currentPage: page,
      totalPages: totalPages,
    })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const searchFriends = async (req, res) => {
  const userId = req.payload.id
  const searchTerm = req.query.searchTerm
  try {
    const user = await User.findOne({ _id: userId }, { friends: 1 }).populate(
      'friends'
    )

    const matchingFriends = user.friends.filter((friend) =>
      friend.Fullname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    res.status(200).json({ succes: true, data: matchingFriends })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
}
module.exports = { search, searchFriends }
