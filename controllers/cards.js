const httpStatusCodes = require('../utils/constants');
const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    return res.status(httpStatusCodes.ok.code).send(cards);
  } catch (e) {
    next(e);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(httpStatusCodes.created.code).send(card);
  } catch (e) {
    next(e);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const checkedCard = await Card.findById(cardId);

    const cardOwnerId = checkedCard.owner.toString();

    if (userId !== cardOwnerId) {
      throw new BadRequestError(httpStatusCodes.badRequest.code);
    }

    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      throw new NotFoundError(httpStatusCodes.notFound.messages.card);
    }

    return res.status(httpStatusCodes.ok.code).send(card);
  } catch (e) {
    next(e);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError(httpStatusCodes.notFound.messages.card);
    }

    return res.status(httpStatusCodes.ok.code).send(card);
  } catch (e) {
    next(e);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      throw new NotFoundError(httpStatusCodes.notFound.messages.card);
    }

    return res.status(httpStatusCodes.ok.code).send(card);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
