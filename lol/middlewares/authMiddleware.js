const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const errorHelper = require('../utils/error');
const User = require('../models/userModel');

module.exports = asyncHandler(async (req, res, next) => {
  const authHeader = req.get('Authorization');
  let decodedToken;

  if (!authHeader) {
    errorHelper('Not authenticated.', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (error) {
    errorHelper('Not authenticated.', 401);
  }

  if (!decodedToken) {
    errorHelper('Not authenticated.', 401);
  }
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    errorHelper('user doesn\'t exist.', 404);
  }

  req.user = user;
  next();
});
