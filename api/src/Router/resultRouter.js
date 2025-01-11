const { getResult } = require('../controller/resultController')
const router = require('express',).Router()

router
.get('/result', getResult)

module.exports = router