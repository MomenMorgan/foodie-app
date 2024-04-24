const express = require('express');

const {
  addUserIdToBody,
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator
} = require('../utils/validators/reviewValidator');

const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');


const router = express.Router();

router
  .route('/')
  .post(isAuth, allowedTo('user'), createReviewValidator, addUserIdToBody, createReview)
  .get(getReviews);

router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .put(isAuth, allowedTo('user'), updateReviewValidator, updateReview)
  .delete(isAuth, allowedTo('admin', 'user'), deleteReviewValidator, deleteReview);

module.exports = router;
