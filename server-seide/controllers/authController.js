const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const errorHelper = require('../utils/error');
const User = require('../models/userModel');

exports.signup = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    email: email,
    password: hashedPassword,
    name: name
  });
  const result = await user.save();

  const token = jwt.sign({
    email: email,
    userId: user._id
  }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });

  res.status(201).json({ message: 'User created!', userId: result._id, token: token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    errorHelper('Invalid email or password.', 401);
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    errorHelper('Invalid email or password.', 401);
  }

  const token = jwt.sign({
    email: email,
    userId: user._id
  }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME });

  res.status(200).json({
    token: token,
    userId: user._id
  });
});
