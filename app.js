import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const PORT = process.env.APP_PORT || 3000;
const DATABASE_PORT = process.env.DATABASE_PORT || 27017;
const DATABASE_NAME = process.env.DATABASE_NAME || "mestodb";

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
