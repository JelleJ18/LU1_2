const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "(wachtwoord)", 
  database: "sakila",
});

module.exports = pool.promise();