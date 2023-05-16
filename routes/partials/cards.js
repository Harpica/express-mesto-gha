import express from 'express';
import {
  createCard,
  deleteCardById,
  dislikeCard,
  getCards,
  likeCard,
} from '../../controllers/cards.js';
import auth from '../../middlewares/auth.js';

const cards = express.Router();

cards.use(auth);
cards.get('/', getCards);
cards.post('/', createCard);
cards.put('/:cardId/likes', likeCard);
cards.delete('/:cardId/likes', dislikeCard);
cards.delete('/:cardId', deleteCardById);

export default cards;
