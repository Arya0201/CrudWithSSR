const express = require('express');
const route = express.Router(); // Create a new router object

const services = require('../services/render'); // Import the service functions for rendering views
const controller = require('../controller/controller'); // Import the controller functions for API endpoints

/**
 *  @description Root Route
 *  @method GET /
 *  Render the home page with the list of users
 */
route.get('/', services.homeRoutes);

/**
 *  @description Add Users Page
 *  @method GET /add-user
 *  Render the page to add a new user
 */
route.get('/add-user', services.addUser);

/**
 *  @description Update User Page
 *  @method GET /update-user
 *  Render the page to update an existing user
 */
route.get('/update-user', services.updateUser);

// API routes for handling CRUD operations

/**
 *  @description Create a new user
 *  @method POST /api/users
 *  Handle the creation of a new user
 */
route.post('/api/users', controller.create);

/**
 *  @description Get all users or a specific user
 *  @method GET /api/users
 *  Handle the retrieval of user data
 */
route.get('/api/users', controller.find);

/**
 *  @description Update an existing user
 *  @method PUT /api/users/:id
 *  Handle the update of a user by ID
 */
route.put('/api/users/:id', controller.update);

/**
 *  @description Delete an existing user
 *  @method DELETE /api/users/:id
 *  Handle the deletion of a user by ID
 */
route.delete('/api/users/:id', controller.delete);

module.exports = route; // Export the router object
