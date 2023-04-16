const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'your-secret-key';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'masroufiDB'
});

app.use(cors());
app.use(bodyParser.json());

//for register with tokens
app.post('/register', (req, res) => {
  const { firstName, lastName, email, userPassword } = req.body;
  const checkEmailQuery = 'SELECT * FROM Users WHERE LOWER(emailAddress) = LOWER(?)';
  
  connection.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error checking email');
    } else {
      if (results.length > 0) {
        res.status(409).send('Email already in use');
      } else {
        const insertQuery = `INSERT INTO Users (firstName, lastName, emailAddress, userPassword) VALUES (?, ?, ?, ?)`;
        connection.query(insertQuery, [firstName, lastName, email, userPassword], (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send('Error registering new user');
          } else {
            const userId = result.insertId; // Get the user ID from the result of the INSERT operation
            const token = jwt.sign({ id: userId, email }, jwtSecretKey, { expiresIn: '1h' });
            console.log("token" + token);
            res.status(200).json({ token });
          }
        });
      }
    }
  });
});


//Login with tokens (works)
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

  const query = `SELECT * FROM Users WHERE emailAddress = ?`;
  const params = [email];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const user = results[0];
    if (results.length === 0) {
      res.status(401).json({ error: 'User not found. Please sign up.' });
 
      return;
    } else if (user.userPassword !== password) {
      console.log(password + " " + user.userPassword);
      res.status(401).json({ error: 'Incorrect password' });
     
      return;
    } else {
      // Sign the JWT token with user's email and user's ID
      const token = jwt.sign(
        {
          email: user.emailAddress,
          id: user.id,
        },
        process.env.JWT_SECRET || 'your_jwt_secret', // Use an environment variable or replace with your secret key
        { expiresIn: '1d' } // Token expires in 1 day
      );
      res.json({ user, token }); // Return the user data and JWT token
    }
  });
});



//idk why its here
router.get('/user', async (req, res) => {
  const {email, password} = req.body
  const getQuery = `SELECT password FROM Users WHERE emailAddress=?`;
  connection.query(getQuery, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching users');
    } else {
      res.status(200).json(result);
    }
    });
});

//for the Categories
app.get('/categories', async (req, res) => {
  const getQuery = `SELECT * FROM Categories`;
  connection.query(getQuery, [], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching categories');
    } else {
      res.status(200).json(result);
    }
    });
});

//to add a new category
app.post('/categories/add', async(req,res)=> {
  const { name, color } = req.body;
  const postQuery = 'INSERT INTO Categories(categoryName, color) VALUES (?,?)';

  connection.query(postQuery, [name, color], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error adding category');
    } else {
      res.status(200).send('Success!');
    }
    });
})


app.use('/',router);

//for the transactions, (it works) 
app.post('/transactions', (req, res) => {
  const { userid, date, time, source, location, payee, amount, category } = req.body;

  connection.query(
    'INSERT INTO Transactions(userID, transactionDate, transactionTime, transactionSource, location, payee, amount, categoryID) VALUES (?, ?, ?, ?)',
    [userid, date, amount, category],
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
    'SELECT * FROM Transactions',
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


//PATCH request to change details about a specific transaction
app.patch('/transactions/update',(req,res) => {
  const { data } = req.body;
})
const updateQuery = 'UPDATE Transactions SET (amount=?, categoryID=?, transactionDate=?, transactionSource=?, payee=?, payer=?, location=?, transactionType=?, note=?) WHERE transactionID=?';


//for the accounts (budgets)
app.get('/budgets', (req, res) => {
  const { userId } = req.body;
  connection.query(
    'SELECT * FROM budgets WHERE userId =?',[userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching budgets:', err);
        res.status(500).send('Error fetching budgets.');
        return;
      }
      res.status(200).json(results);
    }
  );
});

//for the Balance Trend
app.get('/balance-trend', (req, res) => {

  connection.query('SELECT * FROM BalanceHistory', (err, results) => {
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






//old code that works fine, to retrieve in case of errors in new code
//for the register (works fine to keep in case of errors)
/*
app.post('/register', (req, res) => {
  const { firstName, lastName, email, userPassword } = req.body;
  const insertQuery = `INSERT INTO Users (firstName, lastName, emailAddress, userPassword) VALUES (?, ?, ?, ?)`;
  connection.query(insertQuery, [firstName, lastName, email, userPassword], (err, result) => {
    if (err) {
      console.log
      console.log(err);
      res.status(500).send('Error registering new user');
    } else {
      res.status(200).send('Success');
    }
    });
});
*/


//Login works fine (to keep in case of errors) with user not found and incorrect password
/*
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

  const query = `SELECT * FROM Users WHERE emailAddress = ?`;
  const params = [email];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const user = results[0];
    if (results.length === 0) {
      res.status(401).json({ error: 'User not found. Please sign up.' });
 
      return;
    } else if (user.userPassword !== password) {
      console.log(password + " " + user.userPassword);
      res.status(401).json({ error: 'Incorrect password' });
     
      return;
    }
    res.json({ user });
  });
});

*/