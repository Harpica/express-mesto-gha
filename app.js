import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { users } from "./routes/users.js";
import { cards } from "./routes/cards.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Usage of .env file in the root dir
dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 3000;
const DATABASE_PORT = process.env.DATABASE_PORT || 27017;
const DATABASE_NAME = process.env.DATABASE_NAME || "mestodb";

// To get full req.body in JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary middleware for authorization
app.use((req, res, next) => {
  req.user = {
    _id: "63ff61add755c609f47c470d",
  };
  next();
});

// Apply routers
app.use("/users", users);
app.use("/cards", cards);
app.use(errorHandler);

// Connect to db and after successfull connection - start listening to the PORT
mongoose
  .connect(`mongodb://localhost:${DATABASE_PORT}/${DATABASE_NAME}`)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Listening to", PORT);
    })
  )
  .catch((err) => {
    console.error("message:", err.message);
  });
