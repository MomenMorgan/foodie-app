const { check } = require('express-validator');

const validtorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');
const Recipe = require('../../models/recipeModel');
const Review = require('../../models/reviewModel');


exports.getReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid review id format.'),
  validtorMiddleware
];

exports.createReviewValidator = [
  check('title')
    .trim()
    .optional(),
  check('rating')
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5.'),
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
    })
    .custom((recipeId, { req }) => {
      return Review.findOne({ user: req.user._id, recipe: recipeId })
        .then(review => {
          if (review) {
            return Promise.reject(new Error('You reviewed this recipe before.'));
          }
        })
    }),
  validtorMiddleware
];

exports.updateReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid review id format.')
    .custom((reviewId, { req }) => {
      return Review.findById(reviewId)
        .then(review => {
          if (!review) {
            return Promise.reject(new Error('document not found.'));
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(new Error('You are not allowed to perfom this action.'))
          }
        })
    }),
  check('title')
    .trim()
    .optional(),
  check('rating')
    .optional()
    .isFloat({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5.'),
  check('recipe')
    .optional()
    .isMongoId()
    .withMessage('Invalid recipe id format.')
    .custom(recipeId => {
      return Recipe.findById(recipeId).
        then(recipe => {
          if (!recipe) {
            return Promise.reject(new Error('Recipe not found.'));
          }
        });
    }),
  validtorMiddleware
];

exports.deleteReviewValidator = [
  check('id')
    .isMongoId()
    .withMessage('Invalid review id format.')
    .custom((reviewId, { req }) => {
      if (req.user.role === 'user') {
        return Review.findById(reviewId)
          .then(review => {
            if (!review) {
              return Promise.reject(new Error('document not found.'));
            }
            if (review.user._id.toString() !== req.user._id.toString()) {
              return Promise.reject(new Error('You are not allowed to perfom this action.'));
            }
          })
      }
      return true;
    }),
  validtorMiddleware
];
