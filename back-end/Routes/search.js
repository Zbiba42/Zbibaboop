const router = require('express').Router()

const { search } = require('../Controllers/searchController')

router.get('/', search)

module.exports = router
