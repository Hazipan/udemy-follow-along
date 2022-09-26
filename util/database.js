const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "2QzCP.+J+:W~euz!qU3T"
});

module.exports = pool.promise();