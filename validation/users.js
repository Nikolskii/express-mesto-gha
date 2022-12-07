const { celebrate, Joi } = require('celebrate');

const updateUserCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarCelebrate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

const getUserCelebrate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().max(24).required(),
  }),
});

module.exports = {
  updateUserCelebrate,
  updateAvatarCelebrate,
  getUserCelebrate,
};
