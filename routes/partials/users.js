import express from 'express';
import {
  getMyUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from '../../controllers/users.js';
import auth from '../../middlewares/auth.js';

const users = express.Router();

users.use(auth);
users.get('/', getUsers);
users.get('/me', getMyUser);
users.patch('/me/avatar', updateAvatar);
users.patch('/me', updateUser);
users.get('/:id', getUserById);

export default users;
