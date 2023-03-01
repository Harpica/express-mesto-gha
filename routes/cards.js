import express from "express";
import {
  createCard,
  deleteCardById,
  dislikeCard,
  getCards,
  likeCard,
} from "../controllers/cards.js";

export const cards = express.Router();

cards.get("/", getCards);
cards.post("/", createCard);
cards.delete("/:id", deleteCardById);
cards.put("/:id/likes", likeCard);
cards.delete("/:id/likes", dislikeCard);
