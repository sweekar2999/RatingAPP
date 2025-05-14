// controllers/auth.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool=require('../config/db.js');
const { createUser, findUserByEmail } = require('../models/user.model');

const signup = async (req, res) => {
  const { name, email, address, password, role = 'user' } = req.body;

  if (name.length < 20 || name.length > 60) {
    return res.status(400).json({ message: 'Name must be between 20 and 60 characters.' });
  }
  if (!/(?=.*[A-Z])(?=.*[^A-Za-z0-9])/.test(password)) {
    return res.status(400).json({ message: 'Password must include at least one uppercase letter and one special character.' });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, address, password: hashedPassword, role });

    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Invalid credentials.' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: 'Both fields are required' });

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (newPassword.length < 8 || newPassword.length > 16 || !passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: 'New password must be 8–16 characters with at least 1 uppercase and 1 special character'
      });
    }

    // Get current user
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (user.rows.length === 0)
      return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.rows[0].password);
    if (!isMatch)
      return res.status(401).json({ message: 'Current password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, userId]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
  updatePassword
};

