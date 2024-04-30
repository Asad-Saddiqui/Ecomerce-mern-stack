const Category = require("../models/prodcategoryModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    // Extract form data from request body
    const { title } = req.body;

    // Get file details from multer
    const file = req.file;

    // Check if file was uploaded
    if (!file) {
      throw new Error("Please  Upload  PNG Image");

    }
    if (!title) {
      throw new Error("Please  Enter Title");
    }

    // Create a new category object
    const category = new Category({
      title: title,
      image: file.filename // Save the filename to the database
    });
    // Save the category to the database
    await category.save();
    // Return success response
    res.json(category);
  } catch (error) {
    throw new Error(error);

  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCategory = asyncHandler(async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.json(getallCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
