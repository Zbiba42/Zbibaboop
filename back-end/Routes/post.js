const { uploadPostFiles } = require('../middlewares/multerImages')
const {
  addPost,
  getPosts,
  UpdatePostContent,
  UpdatePostTags,
  DeletePost,
} = require('../Controllers/postController')

const router = require('express').Router()

const postRouter = (io) => {
  router.post('/create', uploadPostFiles, (req, res) => addPost(io, req, res))
  router.get('/get', getPosts)
  router.post('/updateContent', UpdatePostContent)
  router.post('/updateTags', UpdatePostTags)
  router.post('/delete', DeletePost)

  return router
}

module.exports = postRouter
