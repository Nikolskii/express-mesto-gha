const User = require('../models/user');

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).send(users);
  } catch (e) {
    console.error(e);

    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
    }

    return res.status(200).send(user);
  } catch (e) {
    console.error(e);

    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    return res.status(201).send(user);
  } catch (e) {
    console.error(e);

    if (e.name === 'ValidationError') {
      return res
        .status(BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные' });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, about } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
    }

    return res.status(200).send(updatedUser);
  } catch (e) {
    console.error(e);

    if (e.name === 'ValidationError') {
      return res
        .status(BAD_REQUEST)
        .send({ message: 'Переданы некорректные данные' });
    }

    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const updatedAvatar = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).send(updatedAvatar);
  } catch (e) {
    console.error(e);

    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
