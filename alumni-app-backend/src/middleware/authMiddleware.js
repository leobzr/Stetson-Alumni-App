import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Optionally, support cookies:
    // const token = authHeader && authHeader.split(' ')[1] || req.cookies?.accessToken;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, no token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified; // Make sure your JWT payload includes 'role'
        next();
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        res.status(403).json({ message: 'Invalid token.' });
    }
};

const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden, admin access only.' });
    }
    next();
};

export { authenticateToken, adminOnly };