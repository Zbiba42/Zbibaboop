const Post = require('../models/post')
const User = require('../models/user')

const getPosts = async (req, res) => {
  const id = req.payload.id
  const pageNumber = req.query.page
  const pageSize = 5
  try {
    const { friends } = await User.findOne(
      { _id: id },
      { friends: 1 }
    ).populate({ path: 'friends', select: 'friends' })

    const friendsOfFriends = friends
      .map((friend) => friend.friends.map((friend) => friend))
      .flat(Infinity)

    const Posts = await Post.find({
      $or: [{ owner: { $in: friends } }, { owner: { $in: friendsOfFriends } }],
    })
      .sort({ timestamp: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .populate('tags owner')

    res.status(200).json({ succes: true, data: Posts })
  } catch (error) {}
}

module.exports = { getPosts }
