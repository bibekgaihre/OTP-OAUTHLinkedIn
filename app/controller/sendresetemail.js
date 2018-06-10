//importing pre defined packages

const nodemailer = require('nodemailer');
const datamask=require('datamask');

exports.resetemail=function(email,link,callback1,callback2){
   
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
        subject: 'Reset Password', // Subject line
        text: 'A password reset for your account was requested', // plain text body
        html: "Please click the button below to change your password.<br><a href=" + link + ">" + "<h2>Change your password</h2>" + "</a> "
        // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            global.censorEmail=datamask.email(email);
            callback2();
        }
        else {
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            global.censorEmail=datamask.email(email);
            console.log(censorEmail);
            callback1();
        }
    });
   
  
}

exports.sendemailpage=function (req,res,next){
    res.send('To Change your password, a link has been sent to "'+ global.censorEmail+'"  .Check your mail');
}

exports.sendemailpageerror=function(req,res,next){
    res.send('Could not send email to "'+global.censorEmail+'". Please try again later ');
}