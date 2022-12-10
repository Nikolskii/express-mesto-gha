const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { limiter } = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errors');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const controllers = require('./controllers/users');
const pageNotFound = require('./controllers/page-not-found');
const { loginCelebrate, createUserCelebrate } = require('./validation/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(limiter);
app.use(express.json());
app.post('/signin', loginCelebrate, controllers.login);
app.post('/signup', createUserCelebrate, controllers.createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', pageNotFound);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT);
