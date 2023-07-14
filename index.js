const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const secretKey = 'your_secret_key';

const message = { message: 'Hello, JWT!' };
const jsonMessage = JSON.stringify(message);

app.use(bodyParser.json());

// Example route for generating a JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Perform your authentication logic here (e.g., check credentials against a database)
  // For simplicity, let's assume the user is authenticated
  const userId = 123;
  
  // Generate a JWT token
  const token = jwt.sign({ userId }, secretKey);

  res.json({ token });
});

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token.' });
    }
    req.user = decoded.userId;
    next();
  });
};

// Example route that requires authentication using JWT
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully.' });
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
