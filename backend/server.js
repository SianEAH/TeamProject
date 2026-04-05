const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
// require('dotenv').config();

const app = express();

console.log("Checking server start..."); // ADD THIS
// Connect to the MongoDB using the db.js script
connectDB();

// Middleware setup
// CORS allows the frontend (Sian andRoberto) to make requests to this backend
app.use(cors());
// Built in express body parser to handle JSON data sent in requests
app.use(express.json());

// Main Route Gateways
// These will link to the route files once we create them in the routes folder
app.use('/api/login', require('./routes/login'));
app.use('/api/registerEmployer', require('./routes/registerEmployer.js')); //Sian
app.use('/api/user', require('./routes/user'));
app.use('/api/puzzles', require('./routes/puzzles'));

// Basic health check route to verify the server is live in the browser
app.get('/', (req, res) => {
    res.send('Digital Escape Room Backend is running');
});

// Set the port from the .env file for local development
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server is successfully running on port ' + PORT);
});

