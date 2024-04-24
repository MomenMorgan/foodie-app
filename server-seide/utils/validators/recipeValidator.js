const { check } = require('express-validator');

const validtorMiddleware = require('../../middlewares/validatorMiddleware');
const Category = require('../../models/categoryModel');
const SubCategory = require('../../models/subCategoryModel');
const Recipe = require('../../models/recipeModel');

exports.getRecipesValidator = [
  check('categoryId')
    .optional()
    .isMongoId()
    .withMessage('Invalid category id format.'),
  check('subcategoryId')
    .optional()
    .isMongoId()
    .withMessage('Invalid subcategory id format.'),
  validtorMiddleware
];

exports.getRecipeValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid recipe id format.'),
  validtorMiddleware
];

exports.createRecipeValidator = [
  check('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Recipe name is too short.'),
  check('description')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Recipe description is too short.'),
  check('ingredients')
    .isArray()
    .withMessage('Ingreidens must be an array of strings.'),
  check('prep_time')
    .optional()
    .isNumeric()
    .withMessage('Prep time must be a number.'),
  check('calories')
    .optional()
    .isNumeric()
    .withMessage('Calories must be a number.'),
  check('category')
    .isMongoId()
    .withMessage('Invalid category id format.')
    .customSanitizer(categoryId => {
      return Category.findById(categoryId).
        then(category => {
          if (!category) {
            return Promise.reject(new Error('Category not found.'));
          }
          return {
            _id: categoryId,
            name: category.name
          }
        })
    })
  ,
  check('subcategory')
    .isMongoId()
    .withMessage('Invalid subcategory id format.')
    .customSanitizer((subCategoryId, { req }) => {
      return SubCategory.findById(subCategoryId).
        then(subcategory => {
          if (!subcategory) {
            return Promise.reject(new Error('Subcategory not found.'));
          }
          if (subcategory.category.toString() !== req.body.category._id) {
            return Promise.reject(new Error('Subcategory does\'t exist in this category.'));
          }
          return {
            _id: subCategoryId,
            name: subcategory.name
          }
        })
    }),
  validtorMiddleware
];

exports.updateRecipeValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid recipe id format.'),
  check('name')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Recipe name is too short.'),
  check('description')
    .optional()
    .trim()
    .isLength({ min: 5 })
    .withMessage('Recipe description is too short.'),
  check('ingredients')
    .optional()
    .isArray()
    .withMessage('Ingreidens must be an array of strings.'),
  check('prep_time')
    .optional()
    .isNumeric()
    .withMessage('Prep time must be a number.'),
  check('calories')
    .optional()
    .isNumeric()
    .withMessage('Calories must be a number.'),
  check('category')
    .optional()
    .isMongoId()
    .withMessage('Invalid category id format.')
    .customSanitizer(categoryId => {
      return Category.findById(categoryId).
        then(category => {
          if (!category) {
            return Promise.reject(new Error('Category not found.'));
          }
          return {
            _id: categoryId,
            name: category.name
          }
        })
    }),
  check('subcategory')
    .optional()
    .isMongoId()
    .withMessage('Invalid subcategory id format.')
    .customSanitizer((subCategoryId, { req }) => {
      return SubCategory.findById(subCategoryId).
        then(subcategory => {
          if (!subcategory) {
            return Promise.reject(new Error('Subcategory not found.'));
          }
          if (subcategory.category.toString() !== req.body.category._id) {
            return Promise.reject(new Error('Subcategory does\'t exist in this category.'));
          }
          return {
            _id: subCategoryId,
            name: subcategory.name
          }
        })
    }),
  validtorMiddleware
];

exports.deleteRecipeValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid recipe id format.'),
  validtorMiddleware
];

exports.addRecipeToCollectionValidator = [
  check('collectionId')
    .isMongoId()
    .withMessage('Invalid collection id format.'),
  check('recipe')
    .isMongoId()
    .withMessage('Invalid recipe id format.')
    .custom(recipeId => {
      return Recipe.findById(recipeId).
        then(recipe => {
          if (!recipe) {
            return Promise.reject(new Error('Recipe not found.'));
          }
        })
    }),
  validtorMiddleware
];

exports.deleteRecipeFromCollectionValidator = [
  check('collectionId')
    .isMongoId()
    .withMessage('Invalid collection id format.'),
  check('recipe')
    .isMongoId()
    .withMessage('Invalid recipe id format.')
    .custom(recipeId => {
      return Recipe.findById(recipeId).
        then(recipe => {
          if (!recipe) {
            return Promise.reject(new Error('Recipe not found.'));
          }
        })
    }),
  validtorMiddleware
];
