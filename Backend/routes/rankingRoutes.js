const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ranking routes
router.get('/', userController.getRankings);

module.exports = router;