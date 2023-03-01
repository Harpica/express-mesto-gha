import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from "../controllers/users.js";

export const users = express.Router();

users.get("/", getUsers);
users.post("/", createUser);
users.patch("/me/avatar", updateAvatar);
users.patch("/me", updateUser);
users.get("/:id", getUserById);
