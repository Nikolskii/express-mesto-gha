const httpStatusCodes = require('../utils/constants');
const User = require('../models/user');

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

const createUser = async (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password,
    });

    return res.status(httpStatusCodes.created.code).send(user);
  } catch (e) {
    console.log(e.name);
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
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
