// routes/auth.routes.js
const express = require('express');
const { signup, login , updatePassword } = require('../controllers/auth.controller');

const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
// Test route - accessible only to admins
router.get('/admin-only', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.json({ message: `Welcome Admin ${req.user.email}`});
});
router.put('/password',authenticateToken,updatePassword);
module.exports = router;




