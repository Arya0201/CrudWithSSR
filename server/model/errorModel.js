// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for the error log
const errorLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now }, // Timestamp of the error
    message: { type: String, required: true }, // Error message
    stackTrace: { type: String } // Stack trace of the error (optional)
});

// Create the ErrorLog model based on the schema
const errorDB = mongoose.model('ErrorLog', errorLogSchema);

// Export the ErrorLog model
module.exports = errorDB;
