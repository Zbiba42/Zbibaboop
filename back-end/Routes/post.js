const { uploadPostFiles } = require('../middlewares/multerImages')
const {
  addPost,
  getPosts,
  getPost,
  UpdatePostContent,
  UpdatePostTags,
  DeletePost,
  getPostComments,
} = require('../Controllers/postController')

const router = require('express').Router()

const postRouter = (io) => {
  router.post('/create', uploadPostFiles, (req, res) => addPost(io, req, res))
  router.get('/get', getPosts)
  router.get('/getOne', getPost)
  router.post('/updateContent', UpdatePostContent)
  router.post('/updateTags', UpdatePostTags)
  router.post('/delete', DeletePost)
  router.get('/getComments', getPostComments)
  return router
}

module.exports = postRouter
