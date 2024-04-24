const express = require('express');

const {
  signup,
  login
} = require('../controllers/authController');

const {
  signupValidator
} = require('../utils/validators/authValidator');
const router = express.Router();

router.post('/signup', signupValidator, signup);

router.post('/login', login);

module.exports = router;
