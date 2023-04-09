const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '29216124',
  database: 'masroufiDB'
});

module.exports = pool;