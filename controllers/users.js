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

const createUser = (req, res) => {
  // const { name, about, avatar } = req.body;
  // console.log(name, about, avatar);
  // User.create({ name, about, avatar })
  //   .then((user) => res.send({ data: user }))
  //   .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUsers, getUser, createUser };
