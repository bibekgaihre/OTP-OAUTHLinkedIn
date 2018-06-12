const express=require('express');
const bodyParser=require('body-parser');
const hbs=require('hbs');
const expressValidator=require('express-validator');
const app=express();
const path=require('path');

const linkedinauthroutes=require('./routes/linkedin-auth');
const profileroutes=require('./routes/profile-routes');
const passportSetup=require('./config/passport_setup');
const cookieSessions=require('cookie-session');
const keys=require('./config/keys');
const passport=require('passport');

//importing routes
const index=require('./routes/index');

app.use('/public',express.static('public'));
app.set('views',path.join(__dirname,'app/views'));

app.set('view engine','hbs');


app.use(cookieSessions({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey],
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth',linkedinauthroutes);
app.use('/profile',profileroutes);

app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use('/',index);

module.exports=app;