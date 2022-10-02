// Module and pacakge imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./util/database");

// Model Imports
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

// Error Controller and Route imports
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Create express application
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Use body-parser to access request bodies and set the static folder to the public file
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set current user to our established dummy user
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err))
})

// Use routes that we imported
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// If nothing else works, use 404: page not found
app.use(errorController.get404);

// database relations
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

// Sync our database
//sequelize.sync({ force: true })
sequelize.sync()
  // Determine if user with id 1 exists and return result
  .then(() => {
    return User.findByPk(1)
  })
  .then(user => {
    // If not, create dummy user and return it
    if (!user) {
      return User.create({ name: "Hazipan", email: "rutherfordaaron1@gmail.com" })
    }
    // otherwise return the user
    return user;
  })
  .then(user => {
    // create a cart for the user and return
    return user.createCart();
  })
  .then(() => {
    // Start the app on port 3000
    app.listen(3000)
  })
  // If any error, just log it to the console for now
  .catch(err => console.log(err));