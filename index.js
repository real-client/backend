import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import userRouter from "./routes/userRoutes.js";

import adminRouter from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
