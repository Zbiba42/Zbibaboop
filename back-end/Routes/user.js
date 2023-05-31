const router = require('express').Router()
const { getUser } = require('../Controllers/userController.js')

router.get('/getUser', getUser)

module.exports = router
