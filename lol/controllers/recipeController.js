const asyncHandler = require('express-async-handler');

const errorHelper = require('../utils/error');
const uploadSingleImage = require('../middlewares/uploadImageMiddleware');
const factory = require('./handlersFactory');
const User = require('../models/userModel');
const Recipe = require('../models/recipeModel');

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { 'category._id': req.params.categoryId };
  } else if (req.params.subcategoryId) {
    filterObject = { 'subcategory._id': req.params.subcategoryId };
  }
  req.filterObject = filterObject;
  next();
};

exports.uploadRecipeImage = uploadSingleImage('recipes', 'image');

exports.createRecipe = factory.createOne(Recipe);

exports.getRecipes = factory.getAll(Recipe);

exports.getRecipe = factory.getOne(Recipe, 'reviews');

exports.updateRecipe = factory.updateOne(Recipe);

exports.deleteRecipe = factory.deleteOne(Recipe);

exports.addRecipeToCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;
  const { recipe } = req.body;

  const user = await User.findById(req.user._id);
  const collectionIndex = user.collections.findIndex(collection => {
    return collection._id.toString() === collectionId
  });

  if (collectionIndex === -1) {
    errorHelper('collection not found.', 404);
  }
  user.collections[collectionIndex].recipes.push(recipe);

  const newDoc = await user.save();
  res.status(200).json({
    message: 'recipe added!',
    user: newDoc
  });
});

exports.deleteRecipeFromCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;
  const { recipe } = req.body;

  const user = await User.findById(req.user._id);

  const collectionIndex = user.collections.findIndex(collection => {
    return collection._id.toString() === collectionId
  });

  if (collectionIndex === -1) {
    errorHelper('collection not found.', 404);
  }

  if (!user.collections[collectionIndex].recipes.includes(recipe)) {
    errorHelper('recipe doesn\'t exist in this category', 404);
  }

  user.collections[collectionIndex].recipes.pull(recipe);

  const newDoc = await user.save();
  res.status(200).json({
    message: 'recipe deleted!',
    user: newDoc
  });
});
