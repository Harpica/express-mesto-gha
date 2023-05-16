import { Joi } from 'celebrate';
import isURL from 'validator/lib/isURL.js';

const validator = {
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
        avatar: Joi.string().custom((value, helper) => {
          if (!isURL(value)) {
            return helper.message('Value is not valid url');
          }
          return true;
        }),
      }),
    },
  },
};

export default validator;
