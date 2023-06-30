const router = require('express').Router()

const { search, searchFriends } = require('../Controllers/searchController')

router.get('/', search)

router.get('/friends', searchFriends)

module.exports = router
