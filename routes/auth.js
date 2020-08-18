const express = require('express');
const {
  login,
  logout,
  getLoggedInUser,
} = require('../controllers/auth/userRoutes');

const router = express.Router();

const { protect } = require('../middleware/auth');
router.post('/login', login);
router.get('/logout', logout);
router.get('/user', protect, getLoggedInUser);

module.exports = router;
