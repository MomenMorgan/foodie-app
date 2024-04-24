const { check } = require('express-validator');

const validtorMiddleware = require('../../middlewares/validatorMiddleware');
const SubCategory = require('../../models/subCategoryModel');

exports.getSubCategoriesValidator = [
  check('categoryId')
    .optional()
    .isMongoId()
    .withMessage('Invalid category id format.'),
  validtorMiddleware
];

exports.getSubCategoryValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid subcategory id format.'),
  validtorMiddleware
];

exports.createSubCategoryValidator = [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Subcategory name is too short.')
    .custom(value => {
      return SubCategory.findOne({ name: value })
        .then(Subcategory => {
          if (Subcategory) {
            return Promise.reject(new Error('Subcategory already exists.'));
          }
        });
    }),
  check('description')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Subcategory description is too short.'),
  check('category')
    .isMongoId()
    .withMessage('Invalid category id.'),
  validtorMiddleware
];

exports.updateSubCategoryValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid subcategory id format.'),
  check('name')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Subcategory name is too short.'),
  check('description')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Subcategory description is too short.'),
  check('category')
    .optional()
    .isMongoId()
    .withMessage('Invalid category id format.'),
  validtorMiddleware
];

exports.deleteSubCategoryValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid Subcategory id format.'),
  validtorMiddleware
];
