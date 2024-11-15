const { createAdmin, getAllAdmin } = require('../controller/adminController')
const { checkSchema } = require('express-validator')
const { createAdminValidateSchema} = require('../validators/createAdminValidate')
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')

const router = require('express').Router()

router
.post('/admin-create', checkSchema(createAdminValidateSchema), createAdmin)
.get('/admins', roleAccessMiddleware, getAllAdmin)


module.exports = router