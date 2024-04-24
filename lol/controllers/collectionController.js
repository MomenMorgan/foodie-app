const asyncHandler = require('express-async-handler');

const errorHelper = require('../utils/error');
const User = require('../models/userModel');

exports.createCollection = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await User.findById(req.user._id);

  user.collections.push({ name });
  const newDoc = await user.save();
  res.status(201).json({ message: 'collection created!', user: newDoc });
});

exports.getCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id).populate({
    path: 'collections',
    populate: 'recipes'
  });

  const collectionIndex = user.collections.findIndex(collection => { return collection._id.toString() === id });
  if (collectionIndex === -1) {
    errorHelper('collection not found.', 404);
  }

  const collection = user.collections[collectionIndex];
  res.status(200).json({ collection: collection });
});

exports.updateCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await User.findById(req.user._id);

  const collectionIndex = user.collections.findIndex(collection => { return collection._id.toString() === id });
  if (collectionIndex === -1) {
    errorHelper('collection not found.', 404);
  }

  user.collections[collectionIndex].name = name;
  const newDoc = await user.save();
  res.status(200).json({ message: 'collection updated!', user: newDoc });
});

exports.deleteCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);

  const collectionIndex = user.collections.findIndex(collection => { return collection._id.toString() === id });
  if (collectionIndex === -1) {
    errorHelper('collection not found.', 404);
  }

  user.collections.splice(collectionIndex, 1);
  const newDoc = await user.save();
  res.status(200).json({ message: 'collection deleted!', user: newDoc });
});
