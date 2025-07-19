const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Claim history routes
router.get('/:userId', userController.getClaimHistory);

module.exports = router; 