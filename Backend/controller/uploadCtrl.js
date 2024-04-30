const fs = require("fs");
const asyncHandler = require("express-async-handler");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      urls.push(file.filename);
    }
    const images = urls.map((file) => {
      return file;
    });
    console.log({images})
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImages = asyncHandler(async (req, res) => {
  try {
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
