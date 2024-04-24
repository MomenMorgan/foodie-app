const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const uploadSingleImage = (folderName, fieldName) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}-${Date.now()}.${file.originalname}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
      || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

  return upload.single(fieldName);
};

module.exports = uploadSingleImage;
