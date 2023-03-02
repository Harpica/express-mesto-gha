import express from 'express';
import errorHandler from '../middlewares/errorHandler.js';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError.js';
import cards from './partials/cards.js';
import users from './partials/users.js';

const routes = express.Router();

routes.use('/users', users);
routes.use('/cards', cards);
// Any other path
routes.use(() => {
  throw new DocumentNotFoundError('Данная страница не найдена');
});
// Middleware to handle all errors
routes.use(errorHandler);

export default routes;
