const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const controllers = require('./controllers/users');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const pageNotFound = require('./controllers/page-not-found');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.post('/signin', controllers.login);
app.post('/signup', controllers.createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', pageNotFound);

app.use(errors);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT);
