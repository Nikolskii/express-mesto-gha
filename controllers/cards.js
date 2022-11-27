const statusCodes = require('../utils/constants');
const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    return res.status(200).send(cards);
  } catch (e) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(201).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные' });
    }

    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }

    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные' });
    }

    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }

    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные' });
    }

    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Карточка не найдена' });
    }

    return res.status(200).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные' });
    }

    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
