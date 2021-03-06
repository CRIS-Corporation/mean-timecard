var User = require('./app/models/user.js');

exports.getUsers = function(req,res,next){
        User.find({},{'name':1,'email':1,'role':1},function(err,result){
            if (req.err) {
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
    if (req.err) {
        console.log('Admin Auth error');
    }
    else {
        if (user.role == 'Admin'){
            next();
        }
        else {
            console.log('User is not Admin')
            res.redirect('/');
        }
    }
        
}
