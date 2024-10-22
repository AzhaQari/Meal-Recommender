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

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach user info to request object
    next(); // Proceed to the next middleware or route
  } catch (err) {
    console.error('JWT Verification Error:', err);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};


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

// Login Route
app.post(
  '/login',
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const user = rows[0];

      // Compare provided password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const payload = {
        user: {
          id: user.id,
          email: user.email
        }
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

// Protected Profile Route
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Use the user information from the token
    const userId = req.user.id;

    // Query user information from the database (excluding password for safety)
    const [rows] = await db.query('SELECT id, email, created_at FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
