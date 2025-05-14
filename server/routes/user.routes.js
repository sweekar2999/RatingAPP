const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth.middleware');
const { getStoresForUser , submitRating } = require('../controllers/user.controller');


router.get('/stores', authenticateToken, getStoresForUser);
router.post('/ratings',authenticateToken,submitRating);
module.exports = router;