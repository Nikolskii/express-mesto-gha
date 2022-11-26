const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6381f55b16c604dda5ea0fa7',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('Подключено к MongoDB!');

    app.listen(PORT, () => {
      console.log(`Приложение запущено на порту ${PORT}!`);
    });
  }
);
