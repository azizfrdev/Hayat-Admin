const { checkSchema } = require('express-validator')
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')
const { createStaffSchema, updateStaffSchema } = require('../validators/staffValidate')
const { createStaff, getAllStaff, getOneStaff, updateStaff, deleteStaff, searchStaff } = require('../controller/staffController')

const router = require('express').Router()

router
.get('/staff-search/:key', roleAccessMiddleware('admin'), searchStaff)
.post('/staff-create', roleAccessMiddleware('admin'), checkSchema(createStaffSchema), createStaff)
.get('/staff', roleAccessMiddleware('admin'), getAllStaff)
.get('/one-staff/:id', roleAccessMiddleware('admin'), getOneStaff)
.post('/staff/:id/update', roleAccessMiddleware('admin'), checkSchema(updateStaffSchema), updateStaff)
.post('/staff/:id/delete', roleAccessMiddleware('admin'), deleteStaff)

module.exports = router