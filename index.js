const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
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
