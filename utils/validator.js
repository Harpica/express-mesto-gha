import { Joi } from 'celebrate';

export const validator = {
  auth: {
    login: {
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    },
    registration: {
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().uri(),
      }),
    },
  },
};
