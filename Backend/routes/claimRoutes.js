const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// Claim points routes
router.post('/:userId', userController.claimPoints);

module.exports = router;