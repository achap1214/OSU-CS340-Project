// App.js

/*
    SETUP
*/
const express = require('express');   // We are using the express library for the web server
const app     = express();            // We need to instantiate an express object to interact with the server in our code
const PORT    = 5757;                 // Set a port number at the top so it's easy to change in the future

app.use(express.urlencoded({
    extended: true
}));

/*
    ROUTES
*/
// app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
//     {
//         res.send("The server is running!")      // This function literally sends the string "The server is running!" to the computer
//     });                                         // requesting the web site.

app.use(express.static('public'));

/*npm
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

// test comment