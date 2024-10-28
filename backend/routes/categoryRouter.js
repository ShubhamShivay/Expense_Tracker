import express from "express";

import {
  addCategoryCtrl,
  getAllCategoriesCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} from "../controllers/categoryCtrl.js";
import { isLoggedIn } from "../middleware/isLogggedIn.js";

const categoryRouter = express.Router();

categoryRouter.post("/add", isLoggedIn, addCategoryCtrl);
categoryRouter.get("/all", isLoggedIn, getAllCategoriesCtrl);
categoryRouter.put("/update/:id", isLoggedIn, updateCategoryCtrl);
categoryRouter.delete("/delete/:id", isLoggedIn, deleteCategoryCtrl);

export default categoryRouter;
