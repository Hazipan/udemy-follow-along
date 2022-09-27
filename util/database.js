const Sequelize = require('sequelize');

const sequelize = new Sequelize("node-complete", "root", "2QzCP.+J+:W~euz!qU3T", {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;