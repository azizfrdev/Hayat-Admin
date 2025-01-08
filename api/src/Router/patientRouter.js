const { checkSchema } = require('express-validator')
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')
const { createPatientSchema, updatePateintSchema } = require('../validators/patientValidate')
const { createPatient, getAllPatients, getOnePatient, updatedPateint, deletePatient, searchPatient } = require('../controller/patientController')

const router = require('express').Router()

router
.get('/patient-search/:key', roleAccessMiddleware(['doctor', 'Registrator']), searchPatient) 
.post('/patient-create', roleAccessMiddleware(['doctor', 'Registrator']), checkSchema(createPatientSchema), createPatient)
.get('/patients', roleAccessMiddleware(['doctor', 'Registrator']),  getAllPatients)
.get('/patient', roleAccessMiddleware('doctor'), getOnePatient)
.post('/patient/:id/update', roleAccessMiddleware('doctor'), checkSchema(updatePateintSchema), updatedPateint)
.post('/patient/:id/delete', roleAccessMiddleware('doctor'), deletePatient)

module.exports = router