const Notification = require('../models/notification')
const Post = require('../models/post')
const User = require('../models/user')

const addPost = async (io, req, res) => {
  const postObject = {
    owner: req.payload.id,
    tags: req.body.tags,
    content: req.body.content,
    files: req.files.map((file) => file.path),
    comments: [],
    reactions: [],
  }
  try {
    const post = await Post.create(postObject)
    console.log(post)
    post.tags.forEach(async (tag) => {
      const notification = await Notification.create({
        sender: post.owner,
        receiver: tag,
        type: 'tag',
        content: { postId: post._id },
      })
      await User.updateOne(
        { _id: tag },
        {
          $push: {
            notifications: notification,
          },
        }
      )
      io.to(tag).emit('notification')
    })
    res.status(200).json({ succes: true, data: post })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}
module.exports = { addPost }
