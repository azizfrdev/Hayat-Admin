const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.roleAccessMiddleware = function (roles) {
    return async function (req, res, next) {
        try {
            const token = req.cookies.authcookie

        if (!token) {
            return res.status(404).send({
                error: 'Token not found'
            })
        }

        const { role } = jwt.verify(token, process.env.JWT_KEY)

        if (roles != role) {
            return res.status(403).send({
                error: "Sizga ruxsat yo'q"
            })
        }

        next()
        } catch (error) {
            console.log(error);
            if (error.message) {
              return res.status(400).send({
                error: error.message,
              });
            }
            return res.status(500).send("Serverda xatolik!"); 
        }
    }
}

exports.doctorAccessMiddleware = function (services) {
    return async function (req, res, next) {
        try {
            const token = req.cookies.authcookie

        if (!token) {
            return res.status(404).send({
                error: 'Token not found'
            })
        }

        const { service } = jwt.verify(token, process.env.JWT_KEY)

        if (services != service) {
            return res.status(403).send({
                error: "Sizga ruxsat yo'q"
            })
        }

        next()
        } catch (error) {
            console.log(error);
            if (error.message) {
              return res.status(400).send({
                error: error.message,
              });
            }
            return res.status(500).send("Serverda xatolik!"); 
        }
    }
}