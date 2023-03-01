import {
  BadRequestError,
  DocumentNotFoundError,
} from "../middlewares/errorHandler.js";
import { card } from "../models/card.js";

export const getCards = (req, res, next) => {
  card
    .find({})
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
  card
    .create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err = new BadRequestError(
          "Переданы некорректные данные при создании карточки"
        );
      }
      next(err);
    });
};

export const deleteCardById = (req, res, next) => {
  const id = req.params.id;
  card
    .findByIdAndDelete(id)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError("Карточка c указанным _id не найдена");
      }
    })
    .catch((err) => {
      next(err);
    });
};

export const likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true }
    )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError("Передан несуществующий _id карточки");
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err = new BadRequestError(
          "Переданы некорректные данные для постановки/снятии лайка. "
        );
      }
      next(err);
    });
};

export const dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true }
    )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new DocumentNotFoundError("Передан несуществующий _id карточки");
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err = new BadRequestError(
          "Переданы некорректные данные для постановки/снятии лайка. "
        );
      }
      next(err);
    });
};
