const router = require('express').Router()

const {
  getConvos,
  getMessages,
  removeMessage,
  editMessage,
} = require('../Controllers/conversationController')

router.get('/convos', getConvos)

router.get('/messages', getMessages)

router.post('/messages/remove', removeMessage)

router.post('/messages/edit', editMessage)

module.exports = router
