// Module and pacakge imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoConnect = require("./util/database").mongoConnect;

// Error Controller and Route imports
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

// Create express application
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Use body-parser to access request bodies and set the static folder to the public file
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// // Set current user to our established dummy user
// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then(user => {
//       req.user = user;
//       next();
//     })
//     .catch(err => console.log(err))
// })

// Use routes that we imported
app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// If nothing else works, use 404: page not found
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
})