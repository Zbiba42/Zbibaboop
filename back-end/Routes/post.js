const { uploadPostFiles } = require('../middlewares/multerImages')
const { addPost, getPosts } = require('../Controllers/postController')

const router = require('express').Router()

const postRouter = (io) => {
  router.post('/create', uploadPostFiles, (req, res) => addPost(io, req, res))
  router.get('/get', getPosts)
  return router
}

module.exports = postRouter
