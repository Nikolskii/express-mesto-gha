const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).send(users);
  } catch (e) {
    console.error(e);

    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }

    return res.status(200).send(user);
  } catch (e) {
    console.error(e);

    return res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    return res.status(201).send(user);
  } catch (e) {
    console.error(e);

    const errors = Object.values(e.errors).map((err) => err.message);

    return res.status(400).send({ message: errors.join(', ') });
  }
};

module.exports = { getUsers, getUser, createUser };
