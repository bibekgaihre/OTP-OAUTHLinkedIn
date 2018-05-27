var express = require('express');
const app = express();
const authroutes=require('./routes/auth-routes');
// const profileroutes=require('./routes/profile-routes');

//set view engine
app.set('view engine','hbs');



//set up routes
app.use('/auth',authroutes);
// app.use('/profile',profileroutes);

app.get('/',(req,res)=>{
    res.render('home');
});

app.listen(3000,()=>{
  console.log("app now listen for port");
});