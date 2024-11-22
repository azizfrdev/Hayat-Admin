const { checkSchema } = require('express-validator')
const { roleAccessMiddleware, doctorAccessMiddleware } = require('../middlewares/role-access-middleware')
const { createPatientSchema, updatePateintSchema, getAnalysisSchema } = require('../validators/patientValidate')
const { createPatient, getAllPatients, getOnePatient, updatedPateint, deletePatient, getAnalysis } = require('../controller/patientController')

const router = require('express').Router()

router
.post('/patient-create', roleAccessMiddleware('doctor'), checkSchema(createPatientSchema), createPatient)
.get('/patients', roleAccessMiddleware('doctor'), doctorAccessMiddleware('Statsionar'), getAllPatients)
.get('/patient', roleAccessMiddleware('doctor'), getOnePatient)
.post('/patient/:id/update', roleAccessMiddleware('doctor'), checkSchema(updatePateintSchema), updatedPateint)
.post('/patient/:id/delete', roleAccessMiddleware('doctor'), deletePatient)

module.exports = router