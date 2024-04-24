const { validationResult } = require('express-validator');

const deleteImageHelper = require('../utils/deleteImage');

const validtorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.file) {
      const imagePath = req.file.path.replace('uploads\\', '').replace('\\', '/');
      deleteImageHelper(imagePath);
    }
    return res.status(422).json({ error: errors.array(), message: 'Validation failed.' });
  }
  next();
};

module.exports = validtorMiddleware;
