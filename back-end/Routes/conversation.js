const router = require('express').Router()

const {
  getConvos,
  getMessages,
} = require('../Controllers/conversationController')

router.get('/convos', getConvos)

router.get('/messages', getMessages)

module.exports = router
