const statusCodes = require('../utils/constants');
const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).send(users);
  } catch (e) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'Произошла внутренняя ошибка сервера' });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }

    return res.status(200).send(user);
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

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });

    return res.status(201).send(user);
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

const updateUser = async (req, res) => {
  const { name, about } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }

    return res.status(200).send(updatedUser);
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

const updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send({ message: 'Пользователь не найден' });
    }

    return res.status(200).send(updatedUser);
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
