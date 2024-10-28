import express from "express";

import {
  addTransactionCtrl,
  // getAllTransactionsCtrl,
  getFilteredTransactionsCtrl,
  updateTransactionCtrl,
  deleteTransactionCtrl,
} from "../controllers/transactionCtrl.js";
import { isLoggedIn } from "../middleware/isLogggedIn.js";

const transactionRouter = express.Router();

transactionRouter.post("/add", isLoggedIn, addTransactionCtrl);
// transactionRouter.get("/all", isLoggedIn, getAllTransactionsCtrl);
transactionRouter.get("/all", isLoggedIn, getFilteredTransactionsCtrl);
transactionRouter.put("/update/:id", isLoggedIn, updateTransactionCtrl);
transactionRouter.delete("/delete/:id", isLoggedIn, deleteTransactionCtrl);

export default transactionRouter;
