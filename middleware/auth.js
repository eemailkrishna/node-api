const { verify } = require('../config/jwt');

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = verify(token);
    req.user = { id: payload.id };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

