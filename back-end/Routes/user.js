const router = require('express').Router()
const { getUser, updateUser } = require('../Controllers/userController.js')
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const userId = req.body.id
    const uploadPath = `./uploads/${userId}`
    fs.mkdirSync(uploadPath, { recursive: true })
    callback(null, uploadPath)
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.originalname.split('.').pop()
    callback(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})

const upload = multer({ storage })
const uploadMiddleware = upload.fields([
  { name: 'ProfilePath' },
  { name: 'CoverPath' },
])

router.get('/getUser', getUser)

router.post('/updateUser', uploadMiddleware, updateUser)

module.exports = router
