const { logout } = require('../controller/auth/logout')

const router = require('express').Router()

router
.post('/logout', logout)