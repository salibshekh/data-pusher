const AccountMember = require('../models/AccountMember');
const Role = require('../models/Role');

exports.addMember = async (req, res) => {
    try {
        const { accountId, userId, roleName } = req.body;
        const role = await Role.findOne({ role_name: roleName });
        if (!role) return res.status(400).json({ success: false, message: 'Role missing' });

        const member = await AccountMember.create({
            account: accountId,
            user: userId,
            role: role._id,
            created_by: req.user ? req.user._id : undefined
        });
        res.status(201).json({ success: true, member });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.listMembers = async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const members = await AccountMember.find({ account: accountId }).populate('user role').lean();
        res.json({ success: true, members });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
