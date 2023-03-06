import mongoose from 'mongoose';
import BadRequestError from '../utils/errors/BadRequestError.js';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError.js';
import User from '../models/user.js';

export const getUsers = (_req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

export const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден'
        );
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный _id'));
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
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя'
          )
        );
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
    }
  )
    .then((user) => {
      if (user !== null) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден'
        );
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля'
          )
        );
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
    }
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new DocumentNotFoundError(
          'Пользователь по указанному _id не найден'
        );
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении аватара'
          )
        );
        return;
      }
      next(err);
    });
};
