const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email & password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'email exists' });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, passwordHash });
    res.json({ id: user._id, email: user.email });
  } catch (e) { next(e); }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token });
  } catch (e) { next(e); }
}

module.exports = { register, login };
