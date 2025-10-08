const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    role_name: { type: String, required: true, unique: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Role', RoleSchema);
