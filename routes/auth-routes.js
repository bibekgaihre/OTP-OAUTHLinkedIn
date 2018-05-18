const router=require('express').Router();
const passport=require('passport');
router.get('/login',(req,res)=>{
  res.render('login');
});

//auth with linkden
router.get('/linkedin',passport.authenticate('linkedin',{
  scope: ['r_basicprofile']
}));

//after would you allow Cremill to access the profile
router.get('/linkedin/redirect',passport.authenticate('linkedin'),(req,res)=>
  {
    res.send('you reached callback url');
  }
);

module.exports=router;