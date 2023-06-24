const router = require('express').Router()
const { uploadMiddleware } = require('../middlewares/multerImages.js')
const {
  getUser,
  updateUser,
  checkUsersRelation,
  getNotifications,
} = require('../Controllers/userController.js')

router.get('/getUser', getUser)

router.get('/getRelation', checkUsersRelation)

router.get('/getNotifs', getNotifications)

router.post('/updateUser', uploadMiddleware, updateUser)

module.exports = router
