const { uploadPostFiles } = require('../middlewares/multerImages')
const postController = require('../Controllers/postController')

const router = require('express').Router()

const postRouter = (io) => {
  router.post('/create', uploadPostFiles, (req, res) =>
    postController.addPost(io, req, res)
  )

  return router
}

module.exports = postRouter
