// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import required dependencies
const express = require('express'); // Express framework for routing and server management
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const sequelize = require('./config/sequelize'); // Sequelize ORM instance to interact with the database

//routes
const userRoutes = require('./routes/userRoutes'); // User-related routes
const eventRoutes = require('./routes/eventRoutes'); // Event-related routes
// Initialize Express application
const app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Set up routes
app.use('/api/users', userRoutes); // Mount user routes under /api/users
app.use('/api/events', eventRoutes); // Mount event routes under /api/events
// Sync Sequelize models with the database
sequelize
  .sync() // Synchronize Sequelize models with the database schema
  .then(() => {
    // Log success message when models are synchronized
    console.log('Sequelize models are synchronized with the database.');
  })
  .catch((error) => {
    // Log error if synchronization fails
    console.error('Error syncing Sequelize models:', error);
  });

// Define the port for the server to listen on (either from environment or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  // Log a success message with the port number when the server starts
  console.log(`🚀 Server running on port ${PORT}`);
});
