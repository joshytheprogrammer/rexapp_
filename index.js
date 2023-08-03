const express = require('express');
const app = express();
const port = 3000; // Change this port number as per your preference

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views (templates) directory
app.set('views', __dirname + '/views');

// Routes
app.get('/', (req, res) => {
  res.render('index', { message: 'Hello, World!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
