const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User management routes
router.get('/', userController.getUsers);
router.post('/', userController.addUser);

module.exports = router;