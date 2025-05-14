const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware.js');
const { getOwnerDashboard } = require('../controllers/owner.controller.js');

router.get('/dashboard', authenticateToken, authorizeRoles('owner'), getOwnerDashboard);

module.exports = router;