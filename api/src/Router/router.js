const { jwtAccessMiddleware } = require('../middlewares/jwt-access-middleware')
const adminRoouter = require('./adminRouter')
const loginRouter = require('./login.Router')

exports.appRouter = (app) => {
    app.use('/api', loginRouter)
    app.use('/api', jwtAccessMiddleware, adminRoouter)
}

