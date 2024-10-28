import asyncHandler from "express-async-handler";
import Transaction from "../model/Transactions.js";

//! @desc   Add transaction
//! @route  POST /Transaction
//! @access Private

export const addTransactionCtrl = asyncHandler(async (req, res) => {
  // console.log(req.userAuthId);
  const { type, category, amount, date, description } = req.body;

  if (!type || !category || !amount || !date || !description) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const validTypes = ["income", "expense"];
  if (!validTypes.includes(type.toLowerCase())) {
    res.status(400);
    throw new Error(
      `Invalid transaction type ${type}. Valid types are ${validTypes}`
    );
  }

  const transaction = await Transaction.create({
    user: req.userAuthId._id,
    amount,
    type: type.toLowerCase(),
    category: category.toLowerCase(),
    date,
    description: description.toLowerCase(),
  });

  res.json(transaction);
});

//! @desc   Get all transactions
//! @route  GET /Transaction
//! @access Private

// export const getAllTransactionsCtrl = asyncHandler(async (req, res) => {
//   const transactions = await Transaction.find({ user: req.userAuthId._id });
//   res.json(transactions);
// });

//! @desc   Get Filtered transactions
//! @route  GET /Transaction
//! @access Private

export const getFilteredTransactionsCtrl = asyncHandler(async (req, res) => {
  const { startDate, endDate, type, category } = req.query;

  const query = {
    user: req.userAuthId._id,
  };

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  if (type) {
    if (type === "all") {
      query.type = type;
    } else {
      query.type = type.toLowerCase();
    }
  }

  if (category) {
    if (category === "all") {
      query.category = category;
    } else {
      query.category = category.toLowerCase();
    }
  }

  const transactions = await Transaction.find(query).sort({ date: -1 });

  res.json(transactions);
});

//! @desc   Update transaction
//! @route  PUT /Transaction
//! @access Private

export const updateTransactionCtrl = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  // console.log(req.params.id);

  if (!transaction) {
    res.status(400);
    throw new Error("Transaction not found");
  }

  if (transaction.user.toString() !== req.userAuthId._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  let a = await Transaction.findById(req.params.id);
  console.log(a);

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    }
  );

  res.json(updatedTransaction);
});

//! @desc   Delete transaction
//! @route  DELETE /Transaction
//! @access Private

export const deleteTransactionCtrl = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  console.log(req.params);

  if (!transaction) {
    res.status(400);
    throw new Error("Transaction not found");
  }

  if (transaction.user.toString() !== req.userAuthId._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Transaction.findByIdAndDelete(req.params.id);

  res.json({ message: "Transaction deleted successfully" });
});
