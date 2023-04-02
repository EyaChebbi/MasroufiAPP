const express = require('express');
const router = express.Router();
//const db = require('../db')


const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'masroufiDB'
});

app.use(cors());
app.use(bodyParser.json());


//for the register
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const insertQuery = `INSERT INTO user (firstName, lastName, emailAdress, userPassword) VALUES (?, ?, ?, ?)`;
  connection.query(insertQuery, [firstName, lastName, email, password], (err, result) => {
    if (err) {
      console.log
      console.log(err);
      res.status(500).send('Error registering new user');
    } else {
      res.status(200).send('Success');
    }
    });
});

// for the login VERSION 1 WORKS FINE (TO KEEP)
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   const selectQuery = `SELECT * FROM user WHERE emailAdress = ?`;
//   connection.query(selectQuery, [email], (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Error fetching user');
//     } else if (result.length == 0) {
//       res.status(401).send('Email or password is incorrect');
//       console.log('Email:', email);
//       console.log('Password:', password);
//     } else {
//       res.status(200).send("User logged in!");
//     }
//   });
// });




//Login Version to test
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('email');
  }
  if (!password) {
    errors.push('password');
  }

  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }

  const query = `SELECT * FROM user WHERE emailAdress = ?`;
  const params = [email];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'User not found. Please sign up.' });
      return;
    }

    const user = results[0];

    if (user.userPassword !== password) {
      console.log(password + " " + user.userPassword);
      res.status(401).json({ error: 'Incorrect password' });
      return;
    }
    res.json({ user });
  });
});



//idk why its here
router.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM user');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//for the Categories
router.get('/categories', async (req, res) => {
  const getQuery = `SELECT * FROM categories`;
  connection.query(getQuery, [], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching categories');
    } else {
      res.status(200).json(result);
    }
    });
});

app.use('/',router);

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