// Handle form submission for adding a new user
$("#add_user").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = $(this).serialize(); // Serialize the form data

    // Send the serialized data via an AJAX POST request
    $.ajax({
        type: "POST",
        url: "/api/users",
        data: formData,
        success: function(response) {
            alert("Data Inserted Successfully!"); // Show success message
            window.location.assign("/"); // Redirect to home page
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error: " + textStatus + " - " + errorThrown); // Handle errors
        }
    });
});

// Handle form submission for updating an existing user
$("#update_user").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    var unindexed_array = $(this).serializeArray(); // Serialize form data into an array
    var data = {}; // Create an empty object to hold the data

    // Convert the array to an object
    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];
    });

    // Construct the AJAX request for updating the user
    var request = {
        "url": `http://localhost:8888/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    };

    // Send the AJAX request
    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!"); // Show success message
        window.location.assign("/"); // Redirect to home page
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Error: " + textStatus + " - " + errorThrown); // Handle errors
    });
});

// Handle deletion of a user record if the current path is the home page
if(window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete"); // Select all delete links
    $ondelete.click(function() {
        var id = $(this).attr("data-id"); // Get the user ID from the data-id attribute

        // Construct the AJAX request for deleting the user
        var request = {
            "url": `http://localhost:8888/api/users/${id}`,
            "method": "DELETE"
        };

        // Confirm the deletion with the user
        if(confirm("Do you really want to delete this record?")) {
            // Send the AJAX request
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully!"); // Show success message
                location.reload(); // Reload the page to reflect the changes
            });
        }
    });
}
