const axios = require('axios'); // Import axios for making HTTP requests

// Render the home page with the list of users
exports.homeRoutes = (req, res) => {
    // Make a GET request to /api/users to fetch the list of users
    axios.get('http://localhost:8888/api/users')
        .then(function(response){
            // Render the 'index' view and pass the user data to it
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            // Send the error message if the request fails
            res.send(err);
        });
};

// Render the page to add a new user
exports.addUser = (req, res) => {
    res.render('add_user'); // Render the 'add_user' view
};

// Render the page to update an existing user
exports.updateUser = (req, res) => {
    // Make a GET request to /api/users with the user ID as a query parameter
    axios.get('http://localhost:8888/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            // Render the 'update_user' view and pass the user data to it
            res.render("update_user", { user : userdata.data });
        })
        .catch(err =>{
            // Send the error message if the request fails
            res.send(err);
        });
};
