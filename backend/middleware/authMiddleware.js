const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Checking for the token in the request header
    const token = req.header('x-auth-token');

    // If no token, no access
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied, no token provided' });
    }

    try {
        // Verify the token using the secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attaching the user data to the request so other routes can use it
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};