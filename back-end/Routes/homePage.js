const { getPosts } = require('../Controllers/homePageController')

const router = require('express').Router()

router.get('/get', getPosts)

module.exports = router
