// Core modules imports
import express from "express";
import bodyParser from "body-parser";
import mongoose, { Mongoose } from "mongoose";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// My imports
import { errorMiddleware } from "./middleware/error.mjs";
import homePageRouter from "./routes/homePage.mjs";
import authRoutes from "./routes/auth.mjs";
import cartPageRouter from "./routes/cart.mjs";

// Read the env vars
config();

// Setting up the port we want to use
const PORT = process.env.PORT || 8080;

// Mongodb connection string
const MONGODB_URI = `mongodb+srv://${process.env.MongodbUser}:${process.env.MongodbPassword}@${process.env.MongodbDataBaseName}.7vjdhyd.mongodb.net/${process.env.MongodbCollectionName}?retryWrites=true&w=majority`;

// Using es6 modules we construct the absolute path to a folder using:
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

// Serving images statically
app.use("/images", express.static(path.join(__dirname, "images")));

// Setting up headers to allows access and setting up headers.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/", homePageRouter);

app.use("/", authRoutes);

app.use("/cart", cartPageRouter);

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
