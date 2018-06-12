const router=require('express').Router();
const passport=require('passport');


//auth with linkden
router.get('/linkedin-login',passport.authenticate('linkedin'));

//auth logout
router.get('/linkedin-logout',(req,res)=>{
  req.logout();
  res.redirect('/');
});

//after would you allow Cremill to access the profile
router.get('/linkedin/redirect',passport.authenticate('linkedin'),(req,res)=>
  {
    // res.send(req.user);
    res.redirect('/profile/');
  }
);

module.exports=router;