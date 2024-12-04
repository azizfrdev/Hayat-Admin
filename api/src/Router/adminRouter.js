const { createAdmin, getAllAdmin, deleteAdmin } = require('../controller/adminController')
const { checkSchema } = require('express-validator')
const { createAdminSchema} = require('../validators/adminValidate')
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')
const { checkAuth } = require('../controller/auth/checkAuth');

const router = require('express').Router()

router
.post('/admin-create', roleAccessMiddleware('admin'), checkSchema(createAdminSchema), createAdmin)
.get('/admins', roleAccessMiddleware('admin'), getAllAdmin)
.post('/admin/:id/delete', roleAccessMiddleware('admin'), deleteAdmin)
.get('/check-auth', checkAuth)


module.exports = router