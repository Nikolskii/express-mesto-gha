const httpStatusCodes = require('../utils/constants');
const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    return res.status(httpStatusCodes.ok.code).send(cards);
  } catch (e) {
    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(httpStatusCodes.created.code).send(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res
        .status(httpStatusCodes.badRequest.code)
        .send({ message: httpStatusCodes.badRequest.message });
    }

    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      return res
        .status(httpStatusCodes.notFound.code)
        .send({ message: httpStatusCodes.notFound.messageCard });
    }

    return res.status(httpStatusCodes.ok.code).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return res
        .status(httpStatusCodes.badRequest.code)
        .send({ message: httpStatusCodes.badRequest.message });
    }

    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
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
        .status(httpStatusCodes.notFound.code)
        .send({ message: httpStatusCodes.notFound.messageCard });
    }

    return res.status(httpStatusCodes.ok.code).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return res
        .status(httpStatusCodes.badRequest.code)
        .send({ message: httpStatusCodes.badRequest.message });
    }

    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
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
        .status(httpStatusCodes.notFound.code)
        .send({ message: httpStatusCodes.notFound.messageCard });
    }

    return res.status(httpStatusCodes.ok.code).send(card);
  } catch (e) {
    if (e.name === 'CastError') {
      return res
        .status(httpStatusCodes.badRequest.code)
        .send({ message: httpStatusCodes.badRequest.message });
    }

    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
