const express = require('express');
const router = express.Router();
const db = require('../db')

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
