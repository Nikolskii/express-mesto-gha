const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    return res.status(200).send(cards);
  } catch (e) {
    console.error(e);

    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user._id });

    return res.status(201).send(card);
  } catch (e) {
    console.error(e);

    const errors = Object.values(e.errors).map((err) => err.message);

    return res.status(400).send({ message: errors.join(', ') });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndRemove(cardId);

    if (!card) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }

    return res.status(200).send(card);
  } catch (e) {
    console.error(e);

    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      {
        new: true,
      }
    );

    res.status(200).send(card);
  } catch (e) {
    console.error(e);

    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const dislikeCard = (req, res) => {
  return res.status(200).send({ removeLike: true });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
