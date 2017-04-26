var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Google sign in initialization
var google_auth = require('google-auth-library');

// Initialize Firebase
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBMqKgR6hjywnkKPNw9kgPNdLAV0_3bA2Q",
    authDomain: "cs2340-cb649.firebaseapp.com",
    databaseURL: "https://cs2340-cb649.firebaseio.com",
    projectId: "cs2340-cb649",
    storageBucket: "cs2340-cb649.appspot.com",
    messagingSenderId: "524782268330"
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

    // Logs user in
    firebase.auth().signInWithEmailAndPassword(email,
        password).catch(function(error) {
            console.log(error.message);
            res.end();
    });
    res.sendFile( __dirname + "/public/templates/dashboard_home.html");
});


// Google sign in request
app.post('/id_token', function(req, res) {
    console.log("User is trying to login using Google account");

    var id_token = JSON.stringify(req.data.id_token);
    console.log("id_token: %s", id_token);

    // Build Firebase credential with the Google ID token.
    var credential = firebase.auth.GoogleAuthProvider.credential(id_token);

    // Sign in with credential from the Google user.
    firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Code: %s", errorCode);
        console.log("Error Message: %s", errorMessage)
    });
});


// Register page requests
app.get('/register', function(req, res) {
    console.log("Got a GET request for the register page, "
        + "sending register");
    res.sendFile( __dirname + "/public/templates/register.html");
});

app.post('/register', function(req, res) {
    // Create new user
    console.log("Got a POST request from register page to "
        + "create new user.")
    /*var email = req.body.email;
    var password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email,
        password).catch(function(error) {
            console.log(error.message);
    });

    // Put user infor into database
    var userId = firebase.auth().currentUser.uid;
    function writeUserData(userId, email) {
        firebase.database().ref('users/' + userId).set( {
            email: email,
            address: null,
            userType: null
        });
    }*/

    res.sendFile( __dirname + "/public/templates/new_profile.html");
});


// New Profile page requests
app.post('/new_profile', function(req,res) {
    var userType = req.body.userType;
    console.log("User is of type: %s", userType);

    // Redirects user based on type
    /*if (userType.localeCompare("admin") == 0) {
        //console.log("admin confirmed")
        //res.sendFile( __dirname +
        //    "/public/templates/admin_dashboard_home.html");

    } else*/ if (userType.localeCompare("manager") == 0) {
        console.log("manager confirmed")
        res.sendFile( __dirname + "/public/templates/manager_dashboard_home.html");

    } else if (userType.localeCompare("worker") == 0) {
        console.log("worker confirmed")
        res.sendFile( __dirname + "/public/templates/worker_dashboard_home.html");

    } else {
        console.log("user confirmed")
        res.sendFile( __dirname + "/public/templates/dashboard_home.html");
    }
});


// Edit profile page requests
app.get('/profile', function(req, res) {
    console.log("Got a GET request for the profile page, "
        + "sending profile template");
    res.sendFile( __dirname + "/public/templates/profile-info.html");
});
app.post('/profile', function(req, res) {
    /*var user = firebase.auth().currentUser;

    var userAddress = JSON.stringify(req.body.address);
    var typeOfuser = JSON.stringify(req.body.userType);
    var updates = {};
    updates['/userAddress/' + ] = userAddress;
    updates['/userType/' + newPostKey] = userAddress;
    function writeUserData(userId, userAddress, typeOfuser) {
        firebase.database().ref('users/' + userId).set( {
            address: userAddress,
            userType: typeOfuser
        });
    }*/
});


// User Dashboard page requests
app.get('/dashboard', function(req, res) {
    console.log("Got a GET request for the dashboard page, "
        + "sending dashboard");
    res.sendFile( __dirname + "/public/templates/dashboard_home.html");
});


//Worker Worker Dashboard page requests
app.get('/workerdashboard', function(req, res) {
    console.log("Got a GET request for the worker dashboard page, "
        + "sending worker dashboard");
    res.sendFile( __dirname + "/public/templates/worker_dashboard_home.html");
});

//Worker Worker Dashboard page requests
app.get('/managerdashboard', function(req, res) {
    console.log("Got a GET request for the worker dashboard page, "
        + "sending worker dashboard");
    res.sendFile( __dirname + "/public/templates/manager_dashboard_home.html");
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


var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Water Reporter listening at http://127.0.0.1:8081")
});