const { checkSchema } = require('express-validator')
const { roleAccessMiddleware, doctorAccessMiddleware } = require('../middlewares/role-access-middleware')
const { createPatientSchema, updatePateintSchema, getAnalysisSchema } = require('../validators/patientValidate')
const { createPatient, getAllPatients, getOnePatient, updatedPateint, deletePatient, getAnalysis, searchPatient } = require('../controller/patientController')

const router = require('express').Router()

router
.get('/patient-search/:key', roleAccessMiddleware('doctor'), doctorAccessMiddleware('Statsionar'), searchPatient) 
.post('/patient-create', roleAccessMiddleware('doctor'), doctorAccessMiddleware('Statsionar'), checkSchema(createPatientSchema), createPatient)
.get('/patients', roleAccessMiddleware('doctor'), doctorAccessMiddleware('Statsionar'), getAllPatients)
.get('/patient', roleAccessMiddleware('doctor'), doctorAccessMiddleware('Statsionar'), getOnePatient)
.post('/patient/:id/update', roleAccessMiddleware('doctor'), doctorAccessMiddleware('Statsionar'), checkSchema(updatePateintSchema), updatedPateint)
.post('/patient/:id/delete', roleAccessMiddleware('doctor'), doctorAccessMiddleware('Statsionar'), deletePatient)

module.exports = router