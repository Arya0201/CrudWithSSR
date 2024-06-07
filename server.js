const express = require('express'); // Import the Express module
const dotenv = require('dotenv'); // Import dotenv to load environment variables
const morgan = require('morgan'); // Import Morgan for logging HTTP requests
const bodyParser = require("body-parser"); // Import body-parser to parse request bodies
const path = require('path'); // Import path to handle file and directory paths

const connectDB = require('./server/database/connection'); // Import the database connection function

const app = express(); // Create an Express application

dotenv.config({ path: 'config.env' }); // Load environment variables from the config.env file
const PORT = process.env.PORT || 8000; // Set the port number from environment variables or default to 8000

// Log requests using Morgan with the 'tiny' format
app.use(morgan('tiny'));

// Connect to MongoDB
connectDB();

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");
// If views are located in a custom directory, uncomment and set the path
// app.set("views", path.resolve(__dirname, "views/ejs"));

// Serve static files from the 'assets' directory
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// Load routers from the router module
app.use('/', require('./server/routes/router'));

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
