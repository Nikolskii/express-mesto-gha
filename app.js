const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const httpStatusCodes = require('./utils/constants');
const controllers = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6381f55b16c604dda5ea0fa7',
  };

  next();
});

app.post('/signin', controllers.login);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => {
  res
    .status(httpStatusCodes.notFound.code)
    .send({ message: httpStatusCodes.notFound.messagePage });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT);
