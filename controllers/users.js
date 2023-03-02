import mongoose from 'mongoose';
import {
  BadRequestError,
  DocumentNotFoundError,
} from '../middlewares/errorHandler.js';
import User from '../models/user.js';

export const getUsers = (_req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      next(err);
    });
};

export const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден',
        );
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

export const createUser = (req, res, next) => {
  const userData = req.body;
  User.create(userData)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const newErr = new BadRequestError(
          'Переданы некорректные данные при создании пользователя',
        );
        next(newErr);
        return;
      }
      next(err);
    });
};

export const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден',
        );
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const newErr = new BadRequestError(
          'Переданы некорректные данные при обновлении профиля',
        );
        next(newErr);
        return;
      }
      next(err);
    });
};

export const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден',
        );
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const newErr = new BadRequestError(
          'Переданы некорректные данные при обновлении аватара',
        );
        next(newErr);
        return;
      }
      next(err);
    });
};
