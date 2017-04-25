var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var google_auth = require('google-auth-library');
var firebase = require("firebase");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBMqKgR6hjywnkKPNw9kgPNdLAV0_3bA2Q",
  authDomain: "cs2340-cb649.firebaseapp.com",
  databaseURL: "https://cs2340-cb649.firebaseio.com/",
};
var firebaseApp = firebase.initializeApp(config);
var database = firebaseApp.database();

// Uses public folder for static files
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/*
Responses for different requests from pages
*/
// Homepage requests
app.get('/', function(req, res) {
    console.log("Got a GET request for the homepage, "
        + "sending welcome-screen");
    res.sendFile( __dirname + "/public/templates/welcome-screen.html");
});

// Log-in page requests
app.get('/login', function(req, res) {
    console.log("Got a GET request for the login page, "
        + "sending log-in");
    res.sendFile( __dirname + "/public/templates/log-in.html");
});
app.get('/log-in', function(req, res) {
    console.log("Got a GET request for the login page, "
        + "sending log-in");
    res.sendFile( __dirname + "/public/templates/log-in.html");
});
app.post('/login', function(req, res) {
    console.log("Got a POST request from login page to "
    + "create sign in user.");
    var email = req.body.email;
    var password = req.body.password;


    firebase.auth().signInWithEmailAndPassword(email,
        password).catch(function(error) {
            console.log(error.message);
            res.end();
    });
    res.sendFile( __dirname + "/public/templates/dashboard_home.html");
});

// Register page requests
app.get('/register', function(req, res) {
    console.log("Got a GET request for the register page, "
        + "sending register");
    res.sendFile( __dirname + "/public/templates/register.html");
});
app.post('/register', function(req, res) {
    console.log("Got a POST request from register page to "
        + "create new user.")
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email,
        password).catch(function(error) {
            console.log(error.message);
            res.end();
        });
    res.sendFile( __dirname + "/public/templates/profile-info.html");
});

// User Dashboard page requests
app.get('/dashboard', function(req, res) {
    console.log("Got a GET request for the dashboard page, "
        + "sending dashboard");
    var user = firebase.auth().currentUser;
    if (user) {
        res.sendFile( __dirname + "/public/templates/dashboard_home.html");
    } else {
        console.log("User not signed in, cannot access dashboard.");
        res.status(403);
    }
});

//Worker Dashboard page requests
app.get('/workerdashboard', function(req, res) {
    console.log("Got a GET request for the worker dashboard page, "
        + "sending worker dashboard");
    res.sendFile( __dirname + "/public/templates/worker_dashboard_home.html");
});

//Water Source Report  page requests
app.get('/submitSourceReport', function(req, res) {
    console.log("Got a GET request for the submit water source report page, "
        + "submit water source report");
    res.sendFile( __dirname + "/public/templates/sourceReport.html");
});

//Water Purity Report page requests
app.get('/submitPurityReport', function(req, res) {
    console.log("Got a GET request for the submit water purity report page, "
        + "submit water purity report");
    res.sendFile( __dirname + "/public/templates/purityReport.html");
});


// Profile page requests
app.get('/profile', function(req, res) {
    console.log("Got a GET request for the profile, "
        + "sending profile");
    res.sendFile( __dirname + "/public/templates/profile-info.html");
});
app.post('/profile', function(req, res) {
    var user = firebase.auth().currentUser;
    if (user) {
        res.sendFile( __dirname + "/public/templates/profile-info.html");
    } else {
        console.log("User not signed in, cannot access dashboard.");
        res.status(403);
    }
});


var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Water Reporter listening at http://127.0.0.1:8081")
})