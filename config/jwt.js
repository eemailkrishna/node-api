const jwt = require('jsonwebtoken');
const { secret } = require('./config');

module.exports = {
  sign: (payload) => jwt.sign(payload, secret, { expiresIn: '1h' }),
  verify: (token) => jwt.verify(token, secret)
};
