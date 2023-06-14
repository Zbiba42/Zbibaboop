const router = require('express').Router()
const { uploadMiddleware } = require('../middlewares/multerImages.js')
const {
  search,
  getUser,
  updateUser,
} = require('../Controllers/userController.js')

router.get('/search', search)

router.get('/getUser', getUser)

router.post('/updateUser', uploadMiddleware, updateUser)

module.exports = router
