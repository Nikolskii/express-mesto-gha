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

const deleteCard = (req, res) => {
  return res.status(200).send({ deleteCard: true });
};

module.exports = { getCards, createCard, deleteCard };
