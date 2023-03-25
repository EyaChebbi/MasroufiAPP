const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost:3306',
  user: 'root',
  password: 'root',
  database: 'masroufiDB'
});

module.exports = pool;