const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "eW4GtHz5jwD5wxU"
});

module.exports = pool.promise();