const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const httpStatusCodes = require('./utils/constants');
const controllers = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.post('/signin', controllers.login);
app.post('/signup', controllers.createUser);

app.use('*', (req, res) => {
  res
    .status(httpStatusCodes.notFound.code)
    .send({ message: httpStatusCodes.notFound.messagePage });
});

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    res
      .status(httpStatusCodes.badRequest.code)
      .send({ message: httpStatusCodes.badRequest.message });
  }

  res.status(statusCode).send({
    message:
      statusCode === httpStatusCodes.internalServerError.code
        ? httpStatusCodes.internalServerError.message
        : message,
  });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT);
