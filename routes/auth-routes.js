const router=require('express').Router();
const passport=require('passport');

//auth login
router.get('/login',(req,res)=>{
  res.render('login');
});

//auth logout
router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
});


//auth with linkden
router.get('/linkedin',passport.authenticate('linkedin'));

//after would you allow Cremill to access the profile
router.get('/linkedin/redirect',passport.authenticate('linkedin'),(req,res)=>
  {
    // res.send(req.user);
    res.redirect('/profile/');
  }
);

module.exports=router;