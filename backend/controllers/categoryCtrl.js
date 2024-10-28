import asyncHandler from "express-async-handler";
import Category from "../model/Category.js";


//! @desc   Add category
//! @route  POST /Category
//! @access Private

export const addCategoryCtrl = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const validTypes = ["income", "expense"];
  if (!validTypes.includes(type.toLowerCase())) {
    res.status(400);
    throw new Error(
      `Invalid category type ${type}. Valid types are ${validTypes}`
    );
  }

  const categoryExists = await Category.findOne({ name: name.toLowerCase() });
  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  console.log(req.userAuthId._id);
  // ! Create category
  const category = await Category.create({
    user: req.userAuthId._id,
    name: name.toLowerCase(),
    type,
  });
  //! Generate token
  res.status(201).json({
    status: "success",
    message: "Category added successfully",
    data: category,
  });
});

//! @desc   Get all categories
//! @route  GET /Category
//! @access Public

export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

//! @desc   Update category
//! @route  PUT /Category/:id
//! @access Private

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
  let { name, type } = req.body;

  //! Normalize name and type if they exist
  const normalizedName = name ? name.toLowerCase() : name;
  const normalizedType = type ? type.toLowerCase() : type;

  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  if (category.user.toString() !== req.userAuthId._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: normalizedName,
        type: normalizedType,
      },
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

//! @desc   Delete category
//! @route  DELETE /Category/:id
//! @access Private

export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }

  if (category.user.toString() !== req.userAuthId._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Category.findByIdAndDelete(req.params.id);

  res.json({ message: "Category deleted successfully" });
});
