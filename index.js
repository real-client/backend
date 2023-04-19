import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import teamRoutes from "./routes/teamRoutes.js";
import volunteersRoutes from "./routes/volunteersRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 6000;
const app = new express();

// MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running ...");
});

app.use("/team", teamRoutes);
app.use("/volunteer", volunteersRoutes);
app.use("/event", eventRoutes);

app.use("/uploads", express.static("./uploads"));

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);

