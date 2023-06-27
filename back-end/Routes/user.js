const router = require('express').Router()
const { uploadMiddleware } = require('../middlewares/multerImages.js')
const {
  getUser,
  updateUser,
  checkUsersRelation,
  removeFriend,
  getNotifications,
  readNtofication,
  removeNtofication,
} = require('../Controllers/userController.js')

router.get('/getUser', getUser)

router.get('/getRelation', checkUsersRelation)

router.get('/getNotifs', getNotifications)

router.post('/removeFriend', removeFriend)

router.post('/updateUser', uploadMiddleware, updateUser)

router.post('/readNotif', readNtofication)

router.post('/removeNotif', removeNtofication)

module.exports = router
