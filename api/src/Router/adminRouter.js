const { createAdmin, getAllAdmin, deleteAdmin } = require('../controller/adminController')
const { checkSchema } = require('express-validator')
const { createAdminSchema} = require('../validators/adminValidate')
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')
const multer = require('multer')
const upload = multer()

const router = require('express').Router()

router
.post('/admin-create', roleAccessMiddleware('admin'), upload.single('image'), checkSchema(createAdminSchema), createAdmin)
.get('/admins', roleAccessMiddleware('admin'), getAllAdmin)
.delete('/admin/:id/delete', roleAccessMiddleware('admin'), deleteAdmin);

module.exports = router