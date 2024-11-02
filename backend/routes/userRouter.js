import express from "express";
import {
  userRegistrationCtrl,
  userLoginCtrl,
  userProfileCtrl,
  updateUserProfileCtrl,
  getAllUsersCtrl,
  deleteUserCtrl,
  changePasswordCtrl,
  forgotPasswordCtrl,
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
userRouter.put("/change-password", isLoggedIn, changePasswordCtrl);
userRouter.put("/reset-password", isLoggedIn, forgotPasswordCtrl);

export default userRouter;
