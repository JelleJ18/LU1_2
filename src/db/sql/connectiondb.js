const connectiondb = require("mysql2");

const pool = connectiondb.createPool({
  host: "localhost",
  user: "root",
  password: "Jankowski1307!", 
  database: "sakila",
});

module.exports = pool.promise();