const { checkSchema } = require('express-validator')
const { createDoctor, getAllDoctors, getOneDoctors, updateDoctor, deleteDoctor, updatePassword } = require('../controller/doctorController')
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')
const { createDoctorSchema, updateDoctorSchema } = require('../validators/doctorValidate')
const { updatePasswordSchema } = require('../validators/updatePasswordValidate')


const router = require('express').Router()

router
.post('/doctor-create', roleAccessMiddleware('admin'), checkSchema(createDoctorSchema), createDoctor)
.get('/doctors', roleAccessMiddleware('admin'), getAllDoctors)
.get('/doctor/:id', roleAccessMiddleware('admin'), getOneDoctors)
.post('/doctor/:id/update', roleAccessMiddleware('admin'), checkSchema(updateDoctorSchema), updateDoctor)
.post('/doctor/:id/update-password', roleAccessMiddleware('admin'), checkSchema(updatePasswordSchema), updatePassword)
.post('/doctor/:id/delete', roleAccessMiddleware('admin'), deleteDoctor)

module.exports = router