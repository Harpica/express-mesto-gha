import mongoose from 'mongoose';
import BadRequestError from '../utils/errors/BadRequestError.js';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError.js';
import Card from '../models/card.js';

export const getCards = (_req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((newCard) => {
      const card = newCard.populate(['owner', 'likes']);
      return card;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const newErr = new BadRequestError(
          'Переданы некорректные данные при создании карточки'
        );
        next(newErr);
        return;
      }
      next(err);
    });
};

export const deleteCardById = (req, res, next) => {
  const id = req.params.cardId;
  Card.findByIdAndDelete(id)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError('Карточка c указанным _id не найдена');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        const newErr = new BadRequestError('Некорректный _id');
        next(newErr);
        return;
      }
      next(err);
    });
};

export const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const newErr = new BadRequestError(
          'Переданы некорректные данные для постановки/снятии лайка. '
        );
        next(newErr);
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        const newErr = new BadRequestError('Некорректный _id');
        next(newErr);
        return;
      }
      next(err);
    });
};

export const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const newErr = new BadRequestError(
          'Переданы некорректные данные для постановки/снятии лайка. '
        );
        next(newErr);
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        const newErr = new BadRequestError('Некорректный _id');
        next(newErr);
        return;
      }
      next(err);
    });
};
