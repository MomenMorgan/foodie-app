const factory = require('./handlersFactory');
const User = require('../models/userModel');

exports.addIdToParams = (req, res, next) => {
  if (req.user) {
    req.params.id = req.user._id;
  }
  next();
};

exports.getUser = factory.getOne(User, 'reviews');
