const { checkSchema } = require('express-validator')
const { login } = require('../controller/auth/login')
const { loginValidateSchema } = require('../validators/loginValidate')

const router = require('express').Router()

router
.post('/login', checkSchema(loginValidateSchema), login)

module.exports = router