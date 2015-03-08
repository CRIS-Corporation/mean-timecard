// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
 // connect to our database

mongoose.connect(configDB.url, function(err) {
    if (err) {
    	console.log("Could not connect to mongo server!");
  		return console.log(err);
  	}
});
var db = mongoose.createConnection('localhost','cris');
db.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

db.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});
require('./config/passport')(passport); // pass passport for configuration
exports.db = db;
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.get('*', function(req, res) {
            res.sendfile('../public/index.html'); // load our public/index.html file
        });
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);