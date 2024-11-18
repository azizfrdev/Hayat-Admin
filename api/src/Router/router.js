const { jwtAccessMiddleware } = require('../middlewares/jwt-access-middleware')
const adminRoouter = require('./adminRouter')
const loginRouter = require('./login.Router')
const doctorRouter = require('./doctorRouter')
const logoutRouter = require('./logoutRouter')
const staffRouter = require('./staffRouter')
const serviceRouter = require('./serviceRouter')
const newsRouter = require('./newsRouter')

exports.appRouter = (app) => {
    app.use('/api', loginRouter)
    app.use('/api', logoutRouter)
    app.use('/api', jwtAccessMiddleware, adminRoouter)
    app.use('/api', jwtAccessMiddleware, doctorRouter)
    app.use('/api', jwtAccessMiddleware, staffRouter)
    app.use('/api', jwtAccessMiddleware, serviceRouter)
    app.use('/api', newsRouter)
}

