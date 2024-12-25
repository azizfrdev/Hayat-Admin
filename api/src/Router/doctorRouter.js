const { checkSchema } = require('express-validator')
const multer = require('multer')
const upload = multer()
const { createDoctor, getAllDoctors, getOneDoctors, updateDoctor, deleteDoctor, updatePassword, searchDoctors } = require('../controller/doctorController')
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')
const { createDoctorSchema, updateDoctorSchema } = require('../validators/doctorValidate')
const { updatePasswordSchema } = require('../validators/updatePasswordValidate')


const router = require('express').Router()

router
.get('/doctor-search/:key', roleAccessMiddleware('admin'), searchDoctors)
.post('/doctor-create', roleAccessMiddleware('admin'), upload.single('image'), checkSchema(createDoctorSchema), createDoctor)
.get('/doctors', roleAccessMiddleware('admin'), getAllDoctors)
.get('/doctor/:id', roleAccessMiddleware('admin'), getOneDoctors)
.put('/doctor/:id/update', roleAccessMiddleware('admin'), upload.single('image'), checkSchema(updateDoctorSchema), updateDoctor)
.put('/doctor/:id/update-password', roleAccessMiddleware('admin'), checkSchema(updatePasswordSchema), updatePassword)
.delete('/doctor/:id/delete', roleAccessMiddleware('admin'), deleteDoctor)

module.exports = router