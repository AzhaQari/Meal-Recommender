// Load all the environment variables defined in the .env file into process.env8
require('dotenv').config();

// Import required modules
const express = require('express'); // Express framework for building the server
const cors = require('cors'); // CORS middleware to enable cross-origin requests
require('dotenv').config(); // dotenv to manage environment variables, allows loading from .env file

// Initialize the express application
const app = express();

// Define the port the server will listen on, with a fallback to port 5000
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors()); // Enables CORS to allow frontend applications to communicate with the backend
app.use(express.json()); // Parses incoming JSON requests, enabling us to handle request bodies

// Define a basic route at the root ('/')
// When a GET request is made to the root URL, it will respond with a message
app.get('/', (req, res) => {
  res.send('Hello from Recipe Backend!'); // Sends a response to the client with a simple message
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  // Logs a message indicating that the server is running and on which port
  console.log(`Server is running on http://localhost:${PORT}`);
});
