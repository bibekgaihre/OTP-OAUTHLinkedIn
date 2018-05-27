const router=require('express').Router();

const routePost = require('../controller/registercontroller')

//auth normal register
router.get('/register',(req,res)=>{
  res.render('register');
});

router.get('/register/validation',routePost.checkuser());

router.get('/dashboard',(req,res)=>{
  res.render('dashboard');
});

router.get('/error',(req,res)=>{
  res.render('errors');
});

router.post('/register',routePost.urlencode,routePost.registration_post);

module.exports=router;