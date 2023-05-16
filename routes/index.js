import express from 'express';
import errorHandler from '../middlewares/errorHandler.js';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError.js';
import cards from './partials/cards.js';
import users from './partials/users.js';
import { createUser, loginUser } from '../controllers/users.js';
import { errors } from 'celebrate';

const routes = express.Router();

routes.post('/signin', loginUser);
routes.post('/signup', createUser);
routes.use('/users', users);
routes.use('/cards', cards);
// Any other path
routes.use(() => {
  throw new DocumentNotFoundError('Данная страница не найдена');
});
// Middleware to handle all errors
routes.use(errors);
routes.use(errorHandler);

export default routes;
