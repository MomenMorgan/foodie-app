const express = require('express');

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage
} = require('../controllers/categoryController');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator
} = require('../utils/validators/categoryValidator');

const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const subCategoryRoute = require('./subCategoryRoute');
const recipeRoute = require('./recipeRoute');

const router = express.Router();

router.use('/:categoryId/subcategories', subCategoryRoute);

router.use('/:categoryId/recipes', recipeRoute);

router
  .route('/')
  .post(isAuth, allowedTo('admin'), uploadCategoryImage, createCategoryValidator, createCategory)
  .get(getCategories);

router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(isAuth, allowedTo('admin'), uploadCategoryImage, updateCategoryValidator, updateCategory)
  .delete(isAuth, allowedTo('admin'), deleteCategoryValidator, deleteCategory);

module.exports = router;
