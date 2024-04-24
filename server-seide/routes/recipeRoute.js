const express = require('express');

const {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addRecipeToCollection,
  deleteRecipeFromCollection,
  uploadRecipeImage,
  createFilterObject
} = require('../controllers/recipeController');

const {
  createRecipeValidator,
  getRecipesValidator,
  getRecipeValidator,
  updateRecipeValidator,
  deleteRecipeValidator,
  addRecipeToCollectionValidator,
  deleteRecipeFromCollectionValidator
} = require('../utils/validators/recipeValidator');

const isAuth = require('../middlewares/authMiddleware');
const allowedTo = require('../middlewares/allowedToMiddleware');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(isAuth, allowedTo('admin'), uploadRecipeImage, createRecipeValidator, createRecipe)
  .get(createFilterObject, getRecipesValidator, getRecipes)
  .put(isAuth, addRecipeToCollectionValidator, addRecipeToCollection)
  .delete(isAuth, deleteRecipeFromCollectionValidator, deleteRecipeFromCollection);

router
  .route('/:id')
  .get(getRecipeValidator, getRecipe)
  .put(isAuth, allowedTo('admin'), uploadRecipeImage, updateRecipeValidator, updateRecipe)
  .delete(isAuth, allowedTo('admin'), deleteRecipeValidator, deleteRecipe);

module.exports = router;
