const jwt = require('jsonwebtoken');
const { secret } = require('./config');
require('dotenv').config();
const expiry = process.env.JWT_EXPIRES_IN

module.exports = {
  sign: (payload) => jwt.sign(payload, secret, { expiresIn: expiry }),
  verify: (token) => jwt.verify(token, secret),
};
