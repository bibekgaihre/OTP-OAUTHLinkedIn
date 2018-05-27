


//importing bcrypt and initializing salt rounds
const bcrypt = require('bcrypt');
const saltRounds = 10;

//importing model functions
const forgetpasswordmodel = require('../model/forgetpasswordmodel');


exports.submitnewpasswordpartner = function (req, res, next) {
    req.checkBody('password', 'Password field can not be set empty').notEmpty();
    req.checkBody('confirmpassword', 'Confirm Password field can not be set empty').notEmpty();
    req.checkBody('password', 'Password field must be between 8-100 character long ').len(8 - 100);
    req.checkBody('password', 'Password field must include one uppercase character, one lowercase character, a number, or special character').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('confirmpassword', 'Password do not match').equals(req.body.password);

    const errors=req.validationErrors();
    if(errors){
        res.send(errors);
    }
    else{
        var token = req.body.token;
        var password=req.body.password;
        bcrypt.hash(password,saltRounds,function(err,hash){
            forgetpasswordmodel.insertnewpasswordpartner(token,hash,function(err,result){
                res.send('Password Changed');
            },function(err,result){
                res.send('Something unexpected error occured please try again');
            })
        })
    }
    
}

exports.submitnewpasswordclient=function(req,res,next){
    req.checkBody('password', 'Password field can not be set empty').notEmpty();
    req.checkBody('confirmpassword', 'Confirm Password field can not be set empty').notEmpty();
    req.checkBody('password', 'Password field must be between 8-100 character long ').len(8 - 100);
    req.checkBody('password', 'Password field must include one uppercase character, one lowercase character, a number, or special character').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('confirmpassword', 'Password do not match').equals(req.body.password);
    const errors=req.validationErrors();
    if(errors){
        res.send(errors);
    }
    else{
        var token=req.body.token;
        var password=req.body.password;
        bcrypt.hash(password,saltRounds,function(err,hash){
            forgetpasswordmodel.insertnewpasswordclient(token,hash,function(err,result){
                res.send('Password changed');
            },function(err,result){
                res.send('Something unexpected error occured please try again');
            })
        })
    }
}

exports.redirectforgetpasswordpartner = function (req, res, next) {
    var token = req.params.token;
    forgetpasswordmodel.checktokenandredirectpartner(token, function (err, result) {
        if (err) throw err;
        else {
            res.send('Page not Found');
        }
    }, function (err, result) {
        if (err) throw err;
        else {
            res.render('resetpassword.hbs',{
                displaytoken:token
            });
        }
    })

}
exports.redirectforgetpasswordclient=function(req,res,next){
    var token=req.params.token;
    forgetpasswordmodel.checktokenandredirectclient(token,function(err,result){
        if(err) throw err;
        else{
            res.send('Page not found');
        }
    },function(err,result){
        if(err) throw err;
        else{
            res.render('resetpassword.hbs',{
                displaytoken:token
            })
        }
    })
}


exports.sendresetlinkpartner = function (req, res, next) {
    var partnerid = req.body.partnerid;
    
    forgetpasswordmodel.sendresetemailpartner(partnerid, function (err, result) {
        if (err) throw err;
        else {
            res.send('PartnerID not found in database. Please check it again');
        }
    },function(err,result){
        if(err) throw err;
        else{
            res.redirect('/passwordresetemail');
        }
    },function(err,result){
        if(err) throw err;
        else{
            res.redirect('/passwordreseterror');
        }
    })
}

exports.sendresetlinkclient=function(req,res,next){
    var username=req.body.username;
    forgetpasswordmodel.sendresetemailclient(username,function(err,result){
        if(err) throw err;
        else{
            res.send('Username not found in database. Please check it again.')
        }
    },function(err,result){
        if(err) throw err;
        else{
            res.redirect('/passwordresetemail');
        }
    },function(err,result){
        if(err) throw err;
        else{
            res.redirect('/passwordreseterror');
        }
    })
}