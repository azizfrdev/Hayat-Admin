const { checkSchema } = require('express-validator')
const { getResult } = require('../controller/resultController')
const { resultSchema } = require('../validators/resultValidate')
const router = require('express',).Router()

router
.post('/result', checkSchema(resultSchema), getResult)

module.exports = router