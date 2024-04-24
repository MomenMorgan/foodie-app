const { check } = require('express-validator');

const validtorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createCollectionValidator = [
  check('name')
    .notEmpty()
    .withMessage('collection name must not be empty.'),
  validtorMiddleware
];

exports.getCollectionValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid collection id format.'),
  validtorMiddleware
];

exports.updateCollectionValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid collection id format.'),
  check('name')
    .notEmpty()
    .withMessage('collection name must not be empty.'),
  validtorMiddleware
];

exports.deleteCollectionValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid collection id format.'),
  validtorMiddleware
];
