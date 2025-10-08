const mongoose = require('mongoose');

const AccountMemberSchema = new mongoose.Schema({
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

AccountMemberSchema.index({ account: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('AccountMember', AccountMemberSchema);
