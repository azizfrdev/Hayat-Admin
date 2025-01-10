const { jwtAccessMiddleware } = require('../middlewares/jwt-access-middleware')
const adminRoouter = require('./adminRouter')
const loginRouter = require('./login.Router')
const doctorRouter = require('./doctorRouter')
const logoutRouter = require('./logoutRouter')
const staffRouter = require('./staffRouter')
const serviceRouter = require('./serviceRouter')
const newsRouter = require('./newsRouter')
const patientRouter = require('./patientRouter')
const analysisRouter = require('./analysisRouter')
const sectionRouter = require('./sectionRouter')
const analysisResultRouter = require('./analysisResultRouter')
const resultRouter = require('./resultRouter')

exports.appRouter = (app) => {
    app.use('/api', loginRouter)
    app.use('/api', logoutRouter)
    app.use('/api', jwtAccessMiddleware, adminRoouter)
    app.use('/api', jwtAccessMiddleware, doctorRouter)
    app.use('/api', jwtAccessMiddleware, staffRouter)
    app.use('/api', jwtAccessMiddleware, serviceRouter)
    app.use('/api', jwtAccessMiddleware, newsRouter)
    app.use('/api', jwtAccessMiddleware, patientRouter)
    app.use('/api', jwtAccessMiddleware, analysisRouter)
    app.use('/api', jwtAccessMiddleware, sectionRouter)
    app.use('/api', jwtAccessMiddleware, analysisResultRouter)
    
    app.use('/api', resultRouter)
    
    app.use((req, res) => {
        return res.status(404).send({
            error: "Page not found"
        })
    })
}

