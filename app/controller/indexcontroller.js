//importing pre defined packages
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
//importing from model
const indexmodel = require('../model/indexmodel');

//importing bcrypt and initializing salt rounds
const bcrypt = require('bcrypt');
const saltRounds = 10;





//functions
//activate account
exports.activateaccount=function(req,res,next){
    var token=req.params.token;
    indexmodel.activateemail(token,function(err,result){
        if(err) throw err;
        else{
            res.send('Activation Completed');
        }
    })
}


//registering partner
exports.registerpartner = function (req, res, next) {
    //validating fields from html page
    req.checkBody('partnerid', 'Partnerid field can not be set empty').notEmpty();
    req.checkBody('partnerid', 'Partnerid field must be 5 character long ').isLength({min:5, max:5});
    req.checkBody('password', 'Password field can not be set empty').notEmpty();
    req.checkBody('password', 'Password field must be between 8-100 character long ').len(8 - 100);
    req.checkBody('password','Password field must include one uppercase character, one lowercase character, a number, or special character').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('confirmpassword', 'Password do not match').equals(req.body.password);
    req.checkBody('companyemail', 'Company email field can not be set empty').notEmpty();
    req.checkBody('companyemail', 'The email you entered is invalid.').isEmail();
    req.checkBody('phonenumber', 'Phone Number field can not be set empty').notEmpty();
    req.checkBody('phonenumber', 'Phone Number field must contain numeric characters only').matches(/^[0-9]*$/, "i");    
    req.checkBody('nameofagency', 'Name of Agency field can not be set empty').notEmpty();
    req.checkBody('city', 'City field can not be set empty').notEmpty();
    req.checkBody('zipcode', 'Zip Code field must contain numeric characters only').matches(/^[0-9]*$/, "i"); 
    // req.checkBody('phonenumber', 'Phone Number field must contain numbers only ').isNumber();
    // req.checkBody('password','Password field must include one uppercase character, one lowercase character, a number, exclamation,at sign or special character').matches(/^(?=.*\d)());
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
    }
    else {
        //fields from html pages
        var partnerid = req.body.partnerid;
        var password = req.body.password;
        var email = req.body.companyemail;
        var phonenumber = parseInt(req.body.phonenumber);
        var nameofagency = req.body.nameofagency;
        var city = req.body.city;
        var country = req.body.country;
        var address = req.body.address;
        var zipcode = parseInt(req.body.zipcode);
        //setting token and link for email confirmation

        var token = randomstring.generate({
            length: 100,
            charset: 'alphanumeric',
            capitalization: 'uppercase'
        });
        var link = "http://localhost:3000/activateaccount/" + token;
        //sending data to model
        bcrypt.hash(password, saltRounds, function (err, hash) {
            indexmodel.insertpartner(partnerid, hash, email, phonenumber, nameofagency, city, country, address, zipcode, token, function (err, result) {
                if (err) throw err;
                else {
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.zoho.com',
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: 'notification@cremill.com', // generated ethereal user
                            pass: 'notify123' // generated ethereal password
                        },
                        //if email is sent via localhost
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    let mailOptions = {
                        from: '"Cremill " <notification@cremill.com>', // sender address
                        to: email, // list of receivers
                        subject: 'Welcome to Cremill', // Subject line
                        text: 'Thank you for Registering', // plain text body
                        html: "Please click the link below to confirm your account<br><a href=" + link + ">" + link + "</a> "
                        // html body
                    };
                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {

                            res.send('Couldnot send activation email.Please try again later');
                            return console.log(error);
                        }
                        else {
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                        }
                    });
                    res.send('Registration completed Check your mail');
                }
            }, function (err, result) {
                res.send("Registration Failed");
            })
        })
    }




}