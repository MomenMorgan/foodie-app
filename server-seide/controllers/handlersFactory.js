const asyncHandler = require('express-async-handler');

const deleteImageHelper = require('../utils/deleteImage');
const errorHelper = require('../utils/error');

exports.createOne = Model => asyncHandler(async (req, res) => {
  // if (!req.file) {
  //   errorHelper('No image provided.', 422);
  // }
  if (req.file) {
    req.body.image = req.file.path.replace('uploads\\', '').replace('\\', '/');
  }

  const document = await Model.create(req.body);

  res.status(201).json({
    message: 'document created!',
    document: document
  });
});

exports.getAll = (Model, populateOpt) => asyncHandler(async (req, res) => {
  let searchQuery = {};
  let query = Model.find(req.filterObject);

  if (populateOpt) {
    query = query.populate({ path: populateOpt, select: 'name  -category' });
  }

  if (req.query.search) {
    searchQuery.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } },
      { ingredients: { $regex: req.query.search, $options: 'i' } },
      { 'category.name': { $regex: req.query.search, $options: 'i' } },
      { 'subcategory.name': { $regex: req.query.search, $options: 'i' } },
    ];
    query = query.find(searchQuery);
  }

  const documents = await query;

  res.status(200).json({ documents: documents });
});

exports.getOne = (Model, populateOpt) => asyncHandler(async (req, res) => {
  let query = Model.findById(req.params.id);

  if (populateOpt) {
    query = query.populate(populateOpt);
  }

  const document = await query;
  if (!document) {
    errorHelper('document not found.', 404);
  }

  delete document._doc.password;
  res.status(200).json({ document: document });
});

exports.updateOne = Model => asyncHandler(async (req, res) => {
  if (req.file) {
    req.body.image = req.file.path.replace('uploads\\', '').replace('\\', '/');
  }

  // if (!image) {
  //   errorHelper('No image provided.', 422);
  // }

  const document = await Model.findById(req.params.id);
  if (!document) {
    errorHelper('document not found.', 404);
  }

  if (req.body.image && document.image) {
    deleteImageHelper(document.image);
  }
  const newDocument = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

  // Trigger "save" event
  newDocument.save()

  res.status(200).json({ message: 'document updated!', document: newDocument });
});

exports.deleteOne = Model => asyncHandler(async (req, res) => {
  const document = await Model.findByIdAndDelete(req.params.id);

  if (!document) {
    errorHelper('document not found.', 404);
  }

  if (document.image) {
    deleteImageHelper(document.image);
  }

  res.status(200).json({ message: 'document deleted!' });
});
