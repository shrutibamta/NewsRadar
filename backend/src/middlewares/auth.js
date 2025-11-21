const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'missing auth' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = payload.userId;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'invalid token' });
  }
}

module.exports = { requireAuth };
