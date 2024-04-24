const uploadSingleImage = require('../middlewares/uploadImageMiddleware');
const factory = require('./handlersFactory');
const Category = require('../models/categoryModel');

exports.uploadCategoryImage = uploadSingleImage('categories', 'image');

exports.createCategory = factory.createOne(Category);

exports.getCategories = factory.getAll(Category, 'subcategories');

exports.getCategory = factory.getOne(Category);

exports.updateCategory = factory.updateOne(Category);

exports.deleteCategory = factory.deleteOne(Category);
