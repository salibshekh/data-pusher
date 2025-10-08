const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(401).json({ success: false, message: 'Authorization header missing' });
        const token = header.split(' ')[1];
        if (!token) return res.status(401).json({ success: false, message: 'Token missing' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).lean();
        if (!user) return res.status(401).json({ success: false, message: 'User not found' });

        req.user = user;
        next();
    } catch (err) {
        console.error('auth error', err);
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};
