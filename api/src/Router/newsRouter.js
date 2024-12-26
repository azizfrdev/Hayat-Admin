const { checkSchema } = require('express-validator')
const multer = require('multer')
const upload = multer()
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')
const { createNewsSchema, updateNewsSchema } = require('../validators/newsValidate')
const { createNews, getAllNews, getOneNews, updateNews, deleteNews } = require('../controller/newsController')

const router = require('express').Router()

router
.post('/news-create', roleAccessMiddleware('admin'), upload.single('image'), checkSchema(createNewsSchema), createNews)
.get('/news', roleAccessMiddleware('admin'), getAllNews)
.get('/news/:id', roleAccessMiddleware('admin'), getOneNews)
.put('/news/:id/update', roleAccessMiddleware('admin'), upload.single('image'), checkSchema(updateNewsSchema), updateNews)
.delete('/news/:id/delete', roleAccessMiddleware('admin'), deleteNews)

module.exports = router