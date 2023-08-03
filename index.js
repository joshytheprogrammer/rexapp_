const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());

if(process.env.NODE_ENV == 'development') {
  mongoose.connect(process.env.DEV_MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err)
  });
}

if(process.env.NODE_ENV == 'production') {

  mongoose.connect(process.env.PROD_MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err)
  });

}

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views (templates) directory
app.set('views', __dirname + '/views');

// Routes
app.get('/', (req, res) => {
  res.render('index', { message: 'Hello, World!' });
});