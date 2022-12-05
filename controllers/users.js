const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpStatusCodes = require('../utils/constants');
const User = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
      expiresIn: '7d',
    });

    return res.send({ token });
  } catch (e) {
    return res.status(401).send({ message: e.message });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashPassword,
    });

    return res.status(httpStatusCodes.created.code).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res
        .status(httpStatusCodes.badRequest.code)
        .send({ message: httpStatusCodes.internalServerError.message });
    }

    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(httpStatusCodes.ok.code).send(users);
  } catch (e) {
    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(httpStatusCodes.notFound.code)
        .send({ message: httpStatusCodes.notFound.messageUser });
    }

    return res.status(httpStatusCodes.ok.code).send(user);
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

const getCurrentUser = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);

    return res.send({ _id: user._id, email: user.email });
  } catch (e) {
    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
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
        .status(httpStatusCodes.notFound.code)
        .send({ message: httpStatusCodes.notFound.messageUser });
    }

    return res.status(httpStatusCodes.ok.code).send(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      return res
        .status(httpStatusCodes.badRequest.code)
        .send({ message: httpStatusCodes.internalServerError.message });
    }

    return res
      .status(httpStatusCodes.internalServerError.code)
      .send({ message: httpStatusCodes.internalServerError.message });
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
        .status(httpStatusCodes.notFound.code)
        .send({ message: httpStatusCodes.notFound.messageUser });
    }

    return res.status(httpStatusCodes.ok.code).send(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError' || e.name === 'CastError') {
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
  login,
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
};
