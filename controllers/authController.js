const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Account = require('../models/Account');

const signToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ success: false, message: 'Email already registered' });

        user = await User.create({ email, password, name });

        const account = await Account.create({ account_name: `${email}-account`, created_by: user._id });

        const token = signToken(user._id);
        res.json({ success: true, token, account });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const valid = await user.comparePassword(password);
        if (!valid) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const token = signToken(user._id);
        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};
