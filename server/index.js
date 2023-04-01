const express = require('express');
const router = express.Router();
const db = require('../db')


const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const saltRounds = 10;
const SECRET_KEY = 'your_secret_key';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
});

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    const insertQuery = `INSERT INTO users (email, password) VALUES (?, ?)`;
    connection.query(insertQuery, [email, hash], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error registering new user');
      } else {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({ token });
      }
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const selectQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(selectQuery, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching user');
    } else if (result.length == 0) {
      res.status(401).send('Email or password is incorrect');
    } else {
      bcrypt.compare(password, result[0].password, (err, match) => {
        if (match) {
          const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
          res.status(200).send({ token });
        } else {
          res.status(401).send('Email or password is incorrect');
        }
      });
    }
  });
});



router.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM User');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//for the Categories
router.get('/categories', async (req, res) => {
  try {
    const [categRows, fields] = await db.query('SELECT * FROM categories');
    res.json(categRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//for the transactions
app.post('/transactions', (req, res) => {
  const { date, description, amount, category } = req.body;

  connection.query(
    'INSERT INTO transactions (date, description, amount, category) VALUES (?, ?, ?, ?)',
    [date, description, amount, category],
    (err, result) => {
      if (err) {
        console.error('Error adding transaction:', err);
        res.status(500).send('Error adding transaction.');
        return;
      }
      res.status(200).send('Transaction added successfully.');
    }
  );
});
app.get('/transactions', (req, res) => {
  connection.query(
    'SELECT * FROM transactions',
    (err, results) => {
      if (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).send('Error fetching transactions.');
        return;
      }
      res.status(200).json(results);
    }
  );
});

//for the Balance Trend
app.get('/balance-trend', (req, res) => {

  connection.query('SELECT * FROM balance_trend', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving balance trend data');
    }

    const chartData = {
      labels: results.map(result => result.month),
      datasets: [
        {
          data: results.map(result => result.amount),
          color: () => '#405457',
          strokeWidth: 2,
        },
      ],
    };
    res.json(chartData);
  });
});

// Define more routes here

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
app.get('/api/data', (req, res) => {
  const data = {
    message: 'Hello, world!'
  };
  res.json(data);
});

module.exports = router;
