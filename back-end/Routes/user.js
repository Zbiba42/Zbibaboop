const router = require('express').Router()
const { uploadMiddleware } = require('../middlewares/multerImages.js')
const {
  getUser,
  updateUser,
  checkUsersRelation,
} = require('../Controllers/userController.js')

router.get('/getUser', getUser)

router.get('/getRelation', checkUsersRelation)

router.post('/updateUser', uploadMiddleware, updateUser)

module.exports = router
