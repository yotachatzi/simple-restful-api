const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRouter = require('./routes/products');
require('dotenv/config');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/products', productRouter);

mongoose.connect(
  process.env.DATABASE_CREDENTIALS,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('🎉 Database connected successfully!'),
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => console.log(`🚀 Server listening on port ${port}. Happy Hacking!`));
