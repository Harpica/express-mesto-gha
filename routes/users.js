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
users.get("/:id", getUserById);
users.post("/", createUser);
users.patch("/me", updateUser);
users.patch("/me/avatar", updateAvatar);
