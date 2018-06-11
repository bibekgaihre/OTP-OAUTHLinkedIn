var express = require('express');
const app = express();
const authroutes=require('./routes/auth-routes');
const profileroutes=require('./routes/profile-routes');
const passportSetup=require('./config/passport_setup');
const cookieSessions=require('cookie-session');
const keys=require('./config/keys');
const passport=require('passport');

//set view engine
app.set('view engine','hbs');

app.use(cookieSessions({
  maxAge:24*60*60*1000,
  keys:[keys.session.cookieKey],
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth',authroutes);
app.use('/profile',profileroutes);

app.get('/',(req,res)=>{
    res.render('home');
});
app.listen(3000,()=>{
  console.log("app now listen for port");
});