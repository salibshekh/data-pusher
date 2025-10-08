const mongoose = require('mongoose');
const { randomBytes } = require('crypto');
const { v4: uuidv4 } = require('uuid');

const AccountSchema = new mongoose.Schema({
    account_id: { type: String, default: () => uuidv4(), unique: true },
    account_name: { type: String, required: true },
    app_secret_token: { type: String, default: () => randomBytes(24).toString('hex'), unique: true },
    website: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

AccountSchema.index({ account_id: 1 });

module.exports = mongoose.model('Account', AccountSchema);
