const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware.js');
const { addUser , addStore,getDashboardStats , getUsersList , getStoresList} = require('../controllers/admin.controller.js');

router.post('/users', authenticateToken, authorizeRoles('admin'), addUser);
router.post('/stores',authenticateToken,authorizeRoles('admin'),addStore);
router.get('/dashboard',authenticateToken,authorizeRoles('admin'),getDashboardStats);
router.get('/users', authenticateToken,authorizeRoles('admin'),getUsersList);
router.get('/stores',authenticateToken,authorizeRoles('admin'),getStoresList);
module.exports = router;