const express = require('express');

const {
  getUser,
  addIdToParams
} = require('../controllers/userController');

const isAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(isAuth, addIdToParams, getUser);

module.exports = router;
