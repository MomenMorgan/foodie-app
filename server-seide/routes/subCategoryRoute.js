const express = require('express');

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  uploadSubCategoryImage,
  createFilterObject
} = require('../controllers/subCategoryController');

const {
  createSubCategoryValidator,
  getSubCategoriesValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator
} = require('../utils/validators/subCategoryValidator');

const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const recipeRoute = require('./recipeRoute');

const router = express.Router({ mergeParams: true });

router.use('/:subcategoryId/recipes', recipeRoute);

router
  .route('/')
  .post(isAuth, allowedTo('admin'), uploadSubCategoryImage, createSubCategoryValidator, createSubCategory)
  .get(createFilterObject, getSubCategoriesValidator, getSubCategories);

router
  .route('/:id')
  .get(getSubCategoryValidator, getSubCategory)
  .put(isAuth, allowedTo('admin'), uploadSubCategoryImage, updateSubCategoryValidator, updateSubCategory)
  .delete(isAuth, allowedTo('admin'), deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
