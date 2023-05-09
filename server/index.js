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

//for register with tokens (works)
app.post('/register', (req, res) => {
  const { firstName, lastName, email, userPassword } = req.body;
  const checkEmailQuery = 'SELECT * FROM Users WHERE LOWER(emailAddress) = LOWER(?)';

  connection.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      // console.log(err);
      res.status(500).send('Error checking email');
    } else {
      if (results.length > 0) {
        res.status(409).send('Email already in use');
      } else {
        const insertQuery = `INSERT INTO Users (firstName, lastName, emailAddress, userPassword) VALUES (?, ?, ?, ?)`;
        connection.query(insertQuery, [firstName, lastName, email, userPassword], (err, result) => {
          if (err) {
            // console.log(err);
            res.status(500).send('Error registering new user');
          } else {
            const userId = result.insertId; // Get the user ID from the result of the INSERT operation
            const token = jwt.sign({ id: userId, email }, jwtSecretKey, { expiresIn: '1h' });
            // console.log("token" + token);
            res.status(200).json({ token});
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
      // console.log(password + " " + user.userPassword);
      res.status(401).json({ error: 'Incorrect password' });

      return;
    } else {
      // Sign the JWT token with user's email and user's ID
      const token = jwt.sign(
        {
          email: user.emailAddress,
          id: user.userID,
        },
        process.env.JWT_SECRET || 'jwt_secret', 
        { expiresIn: '1d' } // Token expires in 1 day
      );
      res.json({ user, token }); // Return the user data and JWT token
    }
  });
});

//for the Categories (it works)
app.get('/categories', async (req, res) => {
  const getQuery = `SELECT * FROM Categories`;
  connection.query(getQuery, [], (err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).send('Error fetching categories');
    } else {
      res.status(200).json(result);
    }
  });
});
// select category with specific id (it works)
app.get('/categories/return', async (req, res) => {
  const { id } = req.query;
  // id = 5;
  const params = [id];
  const query = `SELECT * FROM categories WHERE id = ?`;

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.error(results);
    res.status(200).json(results);
  });
  
}); 
//to add a new category
app.post('/categories/add', async (req, res) => {
  const { name, color } = req.body;
  const postQuery = 'INSERT INTO Categories(categoryName, color) VALUES (?,?)';

  connection.query(postQuery, [name, color], (err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).send('Error adding category');
    } else {
      res.status(200).send('Success!');
    }
  });
})

app.use('/', router);

//for the transactions, (it works) 
app.post('/transactions', async(req, res) => {
  const { userId, amount, categoryID, selectedDate, source, payee, location,  time, type  } = req.body;
  const AddSpendingQuery = 'INSERT INTO Transactions (userID, amount, categoryID, transactionDate, transactionSource, payee, location, transactionTime, transactionType) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ';

 
  connection.query(
    AddSpendingQuery,
    [ userId, amount, categoryID, selectedDate, source, payee, location,  time, type],
    (err, result) => {
      if (err) {
        console.error('Error adding transaction:', err);
        res.status(500).send('Error adding transaction.');
        return;
      }
      // console.log("category index"+ categoryID);
      res.status(200).send('Transaction added successfully.');
    }
  );
});
//transactions (it works)
app.get('/transactions', (req, res) => {
  const { userId } = req.query;
  connection.query(
    'SELECT t.transactionID, t.amount, t.categoryID, c.categoryName as categoryName, t.transactionDate, t.transactionType FROM transactions t JOIN categories c ON t.categoryID = c.id WHERE t.userId = ?', [userId],
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
app.patch('/transactions/update', (req, res) => {
  const { data } = req.body;
})
const updateQuery = 'UPDATE Transactions SET (amount=?, categoryID=?, transactionDate=?, transactionSource=?, payee=?, location=?, transactionType=?, note=?) WHERE transactionID=?';

//newest accounts (it works)
app.get('/budgets', (req, res) => {
  const { userId } = req.query;
  connection.query(
    'SELECT * FROM budgets WHERE userId = ?', [userId],
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

//For the balance

app.get('/balance', (req, res) => {
  const { userId } = req.query;

  connection.query(
    'SELECT balance FROM users WHERE userId = ?', [userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching balance:', err);
        res.status(500).send('Error fetching balance.');
        return;
      }
      // console.log("balance index" + results)
      // console.log(results)
      res.status(200).json(results[0]); // Return only the first result
    }
  );
});

app.get('/topExpenses', async (req, res) => {
  const { id, period } = req.query
  const topExpenseQuery = "SELECT transactions.transactionID, transactions.amount, transactions.categoryID, transactions.transactionDate, categories.categoryName, categories.color from Transactions LEFT OUTER JOIN categories ON transactions.categoryID = categories.id WHERE transactions.transactionType=\"Spending\" AND DATE_SUB(CURDATE(), INTERVAL ? DAY) <= transactions.transactionDate AND transactions.userID=? ORDER BY transactions.amount DESC LIMIT 3;"
  connection.query(topExpenseQuery, [period, id], (err, result) => {
    if (err) {
      console.error('Error finding top expenses', err)
      res.status(500).send('Error finding top expenses')
      return;
    }
    res.status(200).json(result)
  })
})

// retrieve balance history
app.get('/balanceHistory', (req, res) => {
  const { userId } = req.query;

  const query = 'SELECT balanceDate, amount from balancehistory where userID = ?';
  const params =[userId];
  connection.query(
    query,
    params,
    (err, results) => {
      if (err) {
        console.error('Error fetching balance history:', err);
        res.status(500).send('Error fetching balance history.');
        return;
      }
      res.status(200).json(results);
    }
  );
});





//add new balance to balance history

app.post('/addBalanceHistory', async (req, res) => {
  const { userId, selectedDate } = req.body;
  const addToBalanceHistoryQuery = "INSERT into balancehistory (userID, balanceDate, amount) VALUES (?,?,?)";
  connection.query(
    'SELECT balance FROM users WHERE userId = ?', [userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching balance:', err);
        res.status(500).send('Error fetching balance.');
        return;
      }
      console.log(results[0]);
      let bal = results[0].balance;
      connection.query(
        addToBalanceHistoryQuery,
        [userId, selectedDate, bal],
        (err, result) => {
          if (err) {
            console.error('Error updating balance history:', err);
            res.status(500).send('Error updating balance history.');
            return;
          }
          res.status(200).send('Balance history updated successfully.');
        }
      );
    }
  );
});



// retrieve balance history
app.get('/balanceHistory', (req, res) => {
  const { userId } = req.body;

  const query = 'SELECT balanceDate, amount from balancehistory where userID = ?';
  const params =[userId];
  connection.query(
    query,
    params,
    (err, results) => {
      if (err) {
        console.error('Error fetching balance history:', err);
        res.status(500).send('Error fetching balance history.');
        return;
      }
      res.status(200).json(results);
    }
  );
});



//add account (Home screen)
app.post("/budgets/add", async (req, res) => {
    const {userId, account_number, account_type, balance } = req.body;
    const postQuery = 'INSERT INTO budgets(userId, account_number, account_type, balance) VALUES (?,?,?,?)';
    connection.query(postQuery, [userId, account_number, account_type, balance], (err, result) => {
      if (err) {
        // console.log(err);
        res.status(500).send('Error adding account');
      } else {
        res.status(200).send('Success!');
      }
    })
  });

app.post('/categories/add', async (req, res) => {
  const { name, color } = req.body;
  const postQuery = 'INSERT INTO Categories(categoryName, color) VALUES (?,?)';

  connection.query(postQuery, [name, color], (err, result) => {
    if (err) {
      // console.log(err);
      res.status(500).send('Error adding category');
    } else {
      res.status(200).send('Success!');
    }
  });
})

// update balance from add transaction
app.put('/modifBalance', async (req, res) => {
  const { userId, amount, type } = req.body;
  const addToBalanceQuery = "UPDATE users SET balance= ? where userId = ?";
  connection.query(
    'SELECT balance FROM users WHERE userId = ?', [userId],
    (err, results) => {
      if (err) {
        console.error('Error fetching balance:', err);
        res.status(500).send('Error fetching balance.');
        return;
      }
      let balance = results[0].balance;
      let changedAmount = 0.0;
      if (type === 'Spending') {
        changedAmount = balance - amount;
        // console.log("balance" +balance,"amount "+ amount, "changed" +changedAmount)
      }else if (type==='Earning') {
        changedAmount = parseFloat(balance) + parseFloat(amount);
        // console.log("balance" +balance,"amount "+ amount, "changed" +changedAmount)
      }
      connection.query(
        addToBalanceQuery,
        [changedAmount, userId],
        (err, result) => {
          if (err) {
            console.error('Error updating balance:', err);
            res.status(500).send('Error updating balance.');
            return;
          }
          res.status(200).send('Balance updated successfully.');
        }
      );
    }
  );
});


app.listen(3000, () => {
  // console.log('Server listening on port 3000');
});
app.get('/api/data', (req, res) => {
  const data = {
    message: 'Hello, world!'
  };
  res.json(data);
});

module.exports = router;