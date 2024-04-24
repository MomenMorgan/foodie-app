const { check } = require('express-validator');

const validtorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');

exports.getCategoryValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid category id format.'),
  validtorMiddleware
];

exports.createCategoryValidator = [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Category name is too short.')
    .custom(value => {
      return Category.findOne({ name: value })
        .then(category => {
          if (category) {
            return Promise.reject(new Error('Category already exists.'));
          }
        });
    }),
  check('description')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Category description is too short.'),
  validtorMiddleware
];

exports.updateCategoryValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid category id format.'),
  check('name')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Category name is too short.'),
  check('description')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Category description is too short.'),
  validtorMiddleware
];

exports.deleteCategoryValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid category id format.'),
  validtorMiddleware
];
