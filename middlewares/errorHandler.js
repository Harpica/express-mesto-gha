import HttpError from '../utils/errors/HttpError.js';

const errorHandler = (err, _req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    next();
    return;
  }
  console.log({ message: err.message });
  res.status(500).send({ message: 'Ошибка на сервере' });
  next();
};

export default errorHandler;
