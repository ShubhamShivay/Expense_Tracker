import express from "express";
import {
  userRegistrationCtrl,
  userLoginCtrl,
  userProfileCtrl,
  updateUserProfileCtrl,
  getAllUsersCtrl,
  deleteUserCtrl,
} from "../controllers/usersCtrl.js";
import { isLoggedIn } from "../middleware/isLogggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

const userRouter = express.Router();

userRouter.post("/register", userRegistrationCtrl);
userRouter.post("/login", userLoginCtrl);
userRouter.get("/profile", isLoggedIn, userProfileCtrl);
userRouter.get("/all", isLoggedIn, isAdmin, getAllUsersCtrl);
userRouter.put("/update", isLoggedIn, updateUserProfileCtrl);
userRouter.delete("/delete", isLoggedIn, deleteUserCtrl);

export default userRouter;
