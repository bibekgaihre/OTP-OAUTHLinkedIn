const express=require('express');
const bodyParser=require('body-parser');
const hbs=require('hbs');
const expressValidator=require('express-validator');
const app=express();
const path=require('path');

//importing routes
const index=require('./routes/index');

app.use(express.static('public'));
app.set('views',path.join(__dirname,'app/views'));

app.set('view engine','hbs');


app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use('/',index);

module.exports=app;