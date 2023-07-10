const router = require('express').Router()

const { getMessages } = require('../Controllers/messagesController')

router.get('/', getMessages)

module.exports = router
