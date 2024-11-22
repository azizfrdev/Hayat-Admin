const { logout } = require('../controller/auth/logout')

const router = require('express').Router()

router
.get('/logout', logout)

module.exports = router