import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import {
  globalErrorHandler,
  notFound,
} from "./middleware/globalErrorHandler.js";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

const port = process.env.PORT || 5000;
const app = express();

// ! CORS
const allowedOrigins = {
  origin: ["https://expense-tracker-ten-blush.vercel.app"],
};
app.use(cors(allowedOrigins)); //? To allow cross-origin requests

// ! Database Connection
dbConnect(); //? Calling the function to connect to the database

// ! Middleware
app.use(express.json()); //? To accept JSON data

// ! Routes
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/transactions", transactionRouter);

// ! Error Handling
app.use(notFound);
app.use(globalErrorHandler);

// ! Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
