module.exports = function(app, passport) {
    var User = require('../app/models/user.js');
    var WorkLog = require('../app/models/workLog.js');
    var Admin = require('../admin.js');
    var Data = require('../data.js');
    var bodyParser = require('body-parser');
    app.use(bodyParser());
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

    app.get('/entrySuccess', function(req,res) {
        res.render('success.ejs');
    });

    app.post('/enterWorkLog', isLoggedIn, Data.createWorkLog, function(req, res){
        console.log(req.workLog);
        res.redirect('/entrySuccess');
    });
    // API routes
    app.get('/api/users', Admin.getUsers, function(req, res){
        res.send(req.result);
    });
    app.post('/api/users',function(req, res) {
        
        var user = new User();      // create a new instance of the Bear model
        user.google.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
        
    });

    app.get('/api/worklogs', Data.getWorkLogs, function(req, res){
        res.send(req.result);
    });

    app.post('/api/workLogs',function(req, res) {
        
        var workLog = new WorkLog();      // create a new instance of the Bear model
        workLog.startTime = req.body.startTime;  // set the bears name (comes from the request)

        // save the bear and check for errors
        workLog.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'WorkLog created!' });
        });
        
    });

    app.route('/api/users/:_id')

        // get the user with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function(req, res) {
            User.findById(req.params._id, function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        })

        // update the user with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
        .put(function(req, res) {
            User.findById(req.params._id, function(err, user) {

                if (err)
                    res.send(err);

                user.google.name = req.body.name;  // update the bears info

                // save the bear
                user.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'User updated!' });
                });

            });
        })

        // delete the user with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
        .delete(function(req, res) {
            User.remove({
                _id: req.params._id
            }, function(err, bear) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    app.route('/api/worklogs/:_id')

        // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function(req, res) {
            WorkLog.findById(req.params._id, function(err, workLog) {
                if (err)
                    res.send(err);
                res.json(workLog);
            });
        })

        // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
        .put(function(req, res) {
            WorkLog.findById(req.params._id, function(err, workLog) {

                if (err)
                    res.send(err);

                workLog.startTime = req.body.startTime;  // update the bears info

                // save the bear
                workLog.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'WorkLog updated!' });
                });

            });
        })

        // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
        .delete(function(req, res) {
            WorkLog.remove({
                _id: req.params._id
            }, function(err, workLog) {
                if (err)
                    res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });
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
        })
    );

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
