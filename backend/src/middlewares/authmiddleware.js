const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Check for token in Authorization header (Bearer format)
    const authHeader = req.header('Authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7); // Remove 'Bearer ' prefix
    }

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid.' });
    }
};



// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     const token = req.header('x-auth-token');
//     if (!token) {
//         return res.status(401).json({ message: 'No token, authorization denied.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Adds the user payload (id, role) to the request object
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Token is not valid.' });
//     }
// };