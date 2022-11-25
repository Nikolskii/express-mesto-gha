const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use('/users', router);

mongoose.connect(
  'mongodb://127.0.0.1:27017/mestodb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log('Connected to MongoDB!');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  }
);
