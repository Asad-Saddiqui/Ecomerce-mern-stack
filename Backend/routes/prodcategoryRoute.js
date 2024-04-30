const express = require("express");
const multer = require('multer');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
} = require("../controller/prodcategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-cat-' + file.originalname); // Define filename
  }
});

// Define file filter function to accept only PNG files
const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/png') {
    cb(null, true); // Accept PNG files
  } else {
    cb(new Error('Only PNG files are allowed!'), false); // Reject other file types
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


router.post("/", authMiddleware, isAdmin, upload.single('image'), createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getallCategory);

module.exports = router;
