const fs = require('fs');
const path = require('path');

module.exports = filePath => {
  filePath = path.join(__dirname, '..', 'uploads', filePath);
  fs.unlink(filePath, error => {
    if (error) {
      console.log(error);
    }
  });
};
