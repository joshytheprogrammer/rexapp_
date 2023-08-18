const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts'); 

const routes = require('./routes');

dotenv.config();
const app = express();

app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Use express-ejs-layouts
app.use(expressLayouts);
app.use(express.static('public'));

app.set('layout', './layout.ejs')

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views (templates) directory
app.set('views', __dirname + '/views');

// Use routes
app.use('/', routes);

if (process.env.NODE_ENV == 'development') {
  mongoose.connect(process.env.DEV_MONGO_URL)
    .then(() => {
      app.listen(process.env.PORT);
    })
    .catch((err) => {
      console.log(err)
    });
}

if (process.env.NODE_ENV == 'production') {
  mongoose.connect(process.env.PROD_MONGO_URL)
    .then(() => {
      app.listen(process.env.PORT);
    })
    .catch((err) => {
      console.log(err)
    });
}