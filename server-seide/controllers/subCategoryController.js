const uploadSingleImage = require('../middlewares/uploadImageMiddleware');
const factory = require('./handlersFactory');
const SubCategory = require('../models/subCategoryModel');

exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObject = filterObject;
  next();
}

exports.uploadSubCategoryImage = uploadSingleImage('subcategories', 'image');

exports.createSubCategory = factory.createOne(SubCategory);

exports.getSubCategories = factory.getAll(SubCategory);

exports.getSubCategory = factory.getOne(SubCategory);

exports.updateSubCategory = factory.updateOne(SubCategory);

exports.deleteSubCategory = factory.deleteOne(SubCategory);
