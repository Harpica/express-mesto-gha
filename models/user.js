import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import bcrypt from 'bcrypt';
import UnauthorizedError from '../utils/errors/UnauthorizedError';

function emailValidator(value) {
  return isEmail(value);
}

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [emailValidator, 'Value is not email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
const User = mongoose.model('user', userSchema);

userSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

userSchema.statics.validatePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user || !User.validatePassword(password, user.password)) {
        throw new UnauthorizedError('Неверная почта или пароль');
      }
      return user;
    });
};

export default User;
