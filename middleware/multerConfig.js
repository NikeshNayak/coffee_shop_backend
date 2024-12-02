const multer = require("multer");
const path = require("path");

// Set up storage and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/images"); // Directory to store images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
});

module.exports = upload;
