const { checkSchema } = require('express-validator')
const { getAnalysis } = require('../controller/analysisController')
const { getAnalysisSchema } = require('../validators/analysisValidate')


const router = require('express').Router()

router.post('/analysis',checkSchema(getAnalysisSchema), getAnalysis)

module.exports = router
