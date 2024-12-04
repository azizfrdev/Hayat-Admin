const jwt = require('jsonwebtoken'); // Import jsonwebtoken
require('dotenv').config();

exports.checkAuth = (req, res) => {
    try {
        // Retrieve the token from cookies
        const token = req.cookies.authcookie;

        if (!token) {
            return res.status(404).send({
                error: 'Token not found',
            });
        }

        // Verify the token and extract user information
        const user = jwt.verify(token, process.env.JWT_KEY);

        // Return success response with user information
        return res.status(200).send({
            message: 'User is authenticated',
            user,
        });
    } catch (error) {
        console.log('Authentication error:', error);

        if (error.name === 'TokenExpiredError') {
            res.clearCookie('authcookie'); // Clear expired token
            return res.status(401).send({
                error: 'Token has expired. Please log in again.',
            });
        }

        return res.status(400).send({
            error: error.message || 'Invalid token',
        });
    }
};