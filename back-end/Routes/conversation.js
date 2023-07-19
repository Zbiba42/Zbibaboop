const router = require('express').Router()

const {
  getConvos,
  getMessages,
  removeMessage,
} = require('../Controllers/conversationController')

router.get('/convos', getConvos)

router.get('/messages', getMessages)

router.post('/messages/remove', removeMessage)

module.exports = router
