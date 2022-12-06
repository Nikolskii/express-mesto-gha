const { celebrate, Joi } = require('celebrate');

const createCardCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

module.exports = { createCardCelebrate };
