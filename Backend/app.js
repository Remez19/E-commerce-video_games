// Core modules imports
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// My imports
import { errorMiddleware } from "./middleware/error.mjs";
import homePageRouter from "./routes/homePage.mjs";
import authRoutes from "./routes/auth.mjs";
import cartPageRouter from "./routes/cart.mjs";
import orderRouter from "./routes/order.mjs";
import adminRouter from "./routes/admin.mjs";

// Read the env vars
config();

// Setting up the port we want to use
const PORT = process.env.PORT_BACKEND || 8080;

// Mongodb connection string
const MONGODB_URI = process.env.MONGODB_CONNSTRING;

// Using es6 modules we construct the absolute path to a folder using:
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use((req, res, next) => {
  if (req.originalUrl === "/order/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// Serving images statically
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/contact", express.static(path.join(__dirname, "myCV/CV.pdf")));
app.use(express.urlencoded({ extended: true }));

// Setting up headers to allows access and setting up headers.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Response-Type"
  );
  next();
});

app.use("/", homePageRouter);

app.use("/", authRoutes);

app.use("/cart", cartPageRouter);

app.use("/order", orderRouter);

app.use("/admin", adminRouter);

app.post("/contact", (req, res, next) => {
  res.setHeader("Response-Type", "application/pdf");
  res.status(200).sendFile(path.join(__dirname, "myCV/CV.pdf"));
});

// Error middleware to catch any errors in requests
app.use(errorMiddleware);

mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    app.listen(PORT, (err) => {
      if (!err) {
        console.log("Connected to DB.");
        console.log(`Server listening on port ${PORT}`);
      } else {
        console.error("Something went worng!");
        console.error(err);
      }
    });
  })
  .catch((err) => {
    console.error("Server Failed to start.");
    console.error("Cannot connect to mongodb.");
    console.error(err);
  });
