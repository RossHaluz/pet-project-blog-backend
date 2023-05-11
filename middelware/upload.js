const multer = require("multer");
const path = require("path");

const dirPath = path.join(__dirname, "..", "temp");

const storage = multer.diskStorage({
  destination: (__, file, cb) => {
    cb(null, dirPath);
  },
  filename: (__, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
