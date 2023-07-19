const userRouter = require('express').Router(); // создадим express router
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUserAvatar } = require('../controllers/users');

userRouter.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), getUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateUserAvatar);

module.exports = userRouter;