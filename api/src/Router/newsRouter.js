const { checkSchema } = require('express-validator')
const { roleAccessMiddleware } = require('../middlewares/role-access-middleware')
const { createNewsSchema, updateNewsSchema } = require('../validators/newsValidate')
const { createNews, getAllNews, getOneNews, updateNews } = require('../controller/newsController')

const router = require('express').Router()

router
.post('/news-create', roleAccessMiddleware('admin'), checkSchema(createNewsSchema), createNews)
.get('/news', roleAccessMiddleware('admin'), getAllNews)
.get('/news/:id', roleAccessMiddleware('admin'), getOneNews)
.post('/news/:id/update', roleAccessMiddleware('admin'), checkSchema(updateNewsSchema), updateNews)

module.exports = router