const router = require('express').Router()
const {
  signUp,
  logIn,
  LogOut,
  RefreshTokens,
} = require('../Controllers/authController')

router.post('/Signup', signUp)

router.post('/Login', logIn)

router.post('/Logout', LogOut)

router.post('/Refresh', RefreshTokens)
module.exports = router
