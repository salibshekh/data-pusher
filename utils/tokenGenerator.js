const { randomBytes } = require('crypto');

exports.generateToken = (len = 48) => randomBytes(len).toString('hex');
