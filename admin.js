var User = require('./app/models/user.js');

exports.getUsers = function(req,res,next){
        User.find({},{'google.name':1,'google.email':1,'google.role':1},function(err,result){
            if (err) {
                console.log('Admin User Find error');
            }
            else {    
                console.log(result);
                req.result= result;
                next();
            } 
        });
    }

exports.isAdmin = function(req, res, next) {
    user = req.user;
    if (err) {
        console.log('Admin Auth error');
    }
    else {
        if (user.google.role == 'Admin'){
            next();
        }
        else {
            console.log('User is not Admin')
            res.redirect('/');
        }
    }
        
}
