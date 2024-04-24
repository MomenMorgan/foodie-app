const { check } = require('express-validator');

const validtorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.signupValidator = [
  check('name')
    .trim()
    .isLength({ min: 4 })
    .withMessage('name is too short.'),
  check('email')
    .isEmail()
    .withMessage('Invalid email.')
    .custom(value => {
      return User.findOne({ email: value })
        .then(user => {
          if (user) {
            return Promise.reject(new Error('email already exists.'));
          }
        });
    }),
  check('password')
    .trim()
    .isStrongPassword({ minSymbols: 0 }),
  validtorMiddleware
]
