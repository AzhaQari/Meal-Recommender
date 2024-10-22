// Load all the environment variables defined in the .env file into process.env
require('dotenv').config();

// Import required modules
const db = require('./db'); // Import your database connection
const express = require('express'); // Express framework for building the server
const cors = require('cors'); // CORS middleware to enable cross-origin requests
const bcrypt = require('bcrypt'); // Library for password hashing
const jwt = require('jsonwebtoken'); // Library for generating and verifying JWT tokens
const { body, validationResult } = require('express-validator'); // Middleware to validate inputs

// Initialize the express application
const app = express();

// Define the port the server will listen on, with a fallback to port 5000
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors()); // Enables CORS to allow frontend applications to communicate with the backend
app.use(express.json()); // Parses incoming JSON requests, enabling us to handle request bodies

// Define a basic route at the root ('/')
app.get('/', (req, res) => {
  res.send('Hello from Recipe Backend!'); // Sends a response to the client with a simple message
});

// Test database connection route
app.get('/test-db', async (req, res) => {
  try {
    const [result] = await db.query('SELECT 1');
    res.json({ message: 'Database connection successful!', result });
  } catch (err) {
    console.error('Database connection failed:', err);
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

// Register Route
// Register Route
app.post(
  '/register',
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user already exists
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      console.log('Existing user check:', rows); // Log for debugging
      if (rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }



      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save the new user to the database
      await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);


// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
