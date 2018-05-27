var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var clientModel = require('../model/normal_client');
//importing bcrypt and initializing salt rounds
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.urlencode = urlencodedParser;

module.exports.registration_post =(req,res)=>{
    var username=req.body.username;
    var email=req.body.email;
    var phonenumber=req.body.phonenumber;
    var organization_name=req.body.organization_name;
    var job = req.body.job;
    var location=req.body.location;
    var password=req.body.password;

    //encrypting password
    bcrypt.hash(password, saltRounds, function (err, hash) {

    clientModel.insertclient(username,email,phonenumber,organization_name,
                            job,location,hash,
                            function(err, result){
                              if (err) throw err;
                              else{
                                res.redirect('/auth/dashboard'); //redirect to dashboard after successfull registration
                              }
                            }
                          ,
                            
                            function(err, result){
                              res.redirect('/auth/error');
      
                            })
                          })
                      }
                                                
  ;

  // module.exports.checkuser=(req,res) => User.findById('')