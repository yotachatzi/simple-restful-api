const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function Console(text) {
  console.log(text);
}

mongoose.connect(
  process.env.DATABASE_CREDENTIALS,
  { useNewUrlParser: true },
  () => Console.log('🎉 Database connected successfully!'),
);

app.listen(port, () => console.log(`🚀 Server listening on port ${port}. Happy Hacking!`));
