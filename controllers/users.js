import {
  BadRequestError,
  DocumentNotFoundError,
} from "../middlewares/errorHandler.js";
import { user } from "../models/user.js";

export const getUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      next(err);
    });
};

export const getUserById = (req, res, next) => {
  const id = req.params.id;
  user
    .findById(id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      err = new DocumentNotFoundError(
        "Пользователь по указанному _id не найден"
      );
      next(err);
    });
};

export const createUser = (req, res, next) => {
  const userData = req.body;
  user
    .create(userData)
    .then((user) => {
      res.send({ data: user });
      console.log("New user created", user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err = new BadRequestError(
          "Переданы некорректные данные при создании пользователя"
        );
      }
      next(err);
    });
};

export const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  user
    .findByIdAndUpdate(
      id,
      { name, about },
      {
        new: true,
        runValidators: true,
      }
    )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError(
          "Пользователь по указанному _id не найден"
        );
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err = new BadRequestError(
          "Переданы некорректные данные при обновлении профиля"
        );
      }
      next(err);
    });
};

export const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  user
    .findByIdAndUpdate(id, { avatar })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError(
          "Пользователь по указанному _id не найден"
        );
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err = new BadRequestError(
          "Переданы некорректные данные при обновлении аватара"
        );
      }
      next(err);
    });
};
