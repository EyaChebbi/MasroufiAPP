const express = require('express');
const router = express.Router();
const db = require ('../db')

router.get('/users', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM User');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const [categRows, fields] = await db.query('SELECT * FROM categories');
    res.json(categRows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
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
