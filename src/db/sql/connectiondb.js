require('dotenv/config');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT),
  queueLimit: 0,
  namedPlaceholders: true,
  ssl: {rejectUnauthorized: true}
});

module.exports = { pool };