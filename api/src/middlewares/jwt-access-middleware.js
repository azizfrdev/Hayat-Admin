const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.jwtAccessMiddleware = function (req, res, next) {
    try {
        const token = req.cookies.authcookie

        if (!token) {
            return res.status(404).send({
                error: 'Token not found'
            })
        }

        const user = jwt.verify(token, process.env.JWT_KEY)

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