const Comment = require('../models/comment')
const Notification = require('../models/notification')
const Post = require('../models/post')
const User = require('../models/user')
require('dotenv').config()

const getPosts = async (req, res) => {
  const id = req.query.id
  const pageNumber = req.query.page
  const pageSize = 5
  try {
    const posts = await Post.find({ owner: id })
      .populate({ path: 'tags owner', select: 'Fullname' })
      .sort({ timestamp: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
    res.status(200).json({ succes: true, data: posts })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const getPost = async (req, res) => {
  const id = req.query.id
  try {
    const post = await Post.findOne({ _id: id }).populate({
      path: 'tags owner',
    })
    res.status(200).json({ succes: true, data: post })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const addPost = async (io, req, res) => {
  const files = req.files
  const newFiles = []

  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const preview = {
        type: file.mimetype,
        url: process.env.Serverl_url + '/' + file.path,
      }
      newFiles.push(preview)
    }
  }

  const postObject = {
    owner: req.payload.id,
    tags: req.body.tags,
    content: req.body.content,
    files: newFiles,
    comments: [],
    reactions: [],
  }

  try {
    const post = await Post.create(postObject)
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

const UpdatePostContent = async (req, res) => {
  const postId = req.body.postId
  const newContent = req.body.content
  try {
    const post = await Post.updateOne({ _id: postId }, { content: newContent })
    res.status(200).json({ succes: true, data: post })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const UpdatePostTags = async (req, res) => {
  const postId = req.body.postId
  const newTags = req.body.newTags
  try {
    const post = await Post.updateOne({ _id: postId }, { tags: newTags })
    res.status(200).json({ succes: true, data: post })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const DeletePost = async (req, res) => {
  const postId = req.body.postId
  try {
    const post = await Post.deleteOne({ _id: postId })
    res.status(200).json({ succes: true, data: post })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const getPostComments = async (req, res) => {
  const postId = req.query.postId
  const pageNumber = req.query.page
  const pageSize = 5
  try {
    const comments = await Comment.find({ onPost: postId })
      .populate({ path: 'owner', select: 'Fullname ProfilePath' })
      .sort({ timestamp: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
    res.status(200).json({ succes: true, data: comments })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

module.exports = {
  addPost,
  getPost,
  getPosts,
  UpdatePostContent,
  UpdatePostTags,
  DeletePost,
  getPostComments,
}
