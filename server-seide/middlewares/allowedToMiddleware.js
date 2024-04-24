const errorHelper = require('../utils/error');

module.exports = (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      errorHelper('You are not allowed to access this route.', 403);
    }
    next();
  }
