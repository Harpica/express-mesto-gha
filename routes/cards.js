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
cards.put("/:cardId/likes", likeCard);
cards.delete("/:cardId/likes", dislikeCard);
cards.delete("/:cardId", deleteCardById);
