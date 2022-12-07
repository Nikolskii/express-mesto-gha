const { celebrate, Joi } = require('celebrate');

const updateUserCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarCelebrate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().dataUri(),
  }),
});

module.exports = { updateUserCelebrate, updateAvatarCelebrate };
