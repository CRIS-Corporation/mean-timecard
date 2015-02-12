module.exports = function(app, passport) {
    var User = require('../app/models/user.js');
    var WorkLog = require('../app/models/worklog.js');
    var Admin = require('../admin.js');
    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
    // route for admin view
    app.get('/admin', isLoggedIn, Admin.getUsers, Admin.isAdmin,function(req, res) {
        user = req.user;
        users = req.result;
        res.render('admin.ejs', {
            users : users
        });
    });

    app.get('/timecard', isLoggedIn, function(req, res) {
        res.render('timecard.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });
    
    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
  

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            /*if (user.google.role == 'Admin'){
                successRedirect : '/admin'            
            }
            else {
                successRedirect : '/profile'
            }*/
            successRedirect : '/admin',
            failureRedirect : '/'
        }));

// route middleware to make sure a user is logged in
/*function getUsers(req,res,next){
        var User = require('../app/models/user');
        User.find({},{'google.name':1,'google.email':1,'google.role':1},function(err,result){
            if (err) {
                console.log('Find was no good');
            }
            else {    
                console.log(result);
                req.result= result;
                next();
            } 
        });
    }*/

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }
};
