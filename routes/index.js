const express=require('express');
const router=express.Router();

//importing controllers
const indexcontroller=require('../app/controller/indexcontroller');
const forgetpasswordcontroller=require('../app/controller/forgetpasswordcontroller');
const sendresetemail=require('../app/controller/sendresetemail');

router.get('/',function(req,res){
    res.render('index.hbs');
});

router.get('/activateaccountpartner/:token',indexcontroller.activateaccountpartner);
router.get('/activateaccountclient/:token',indexcontroller.activateaccountclient);
router.post('/registerpartner',indexcontroller.registerpartner);
router.post('/registerclient',indexcontroller.registerclient);



router.get('/forgetpasswordpartner',function(req,res){
    res.render('forgetpassword.hbs');
})
router.get('/forgetpasswordclient',function(req,res){
    res.render('forgetpasswordclient.hbs');
})
router.get('/forgetpasswordpartner/:token',forgetpasswordcontroller.redirectforgetpasswordpartner);
router.get('/forgetpasswordclient/:token',forgetpasswordcontroller.redirectforgetpasswordclient)

router.post('/forgetpasswordpartner',forgetpasswordcontroller.sendresetlinkpartner);
router.post('/resetpasswordpartner',forgetpasswordcontroller.submitnewpasswordpartner);
router.post('/resetpasswordclient',forgetpasswordcontroller.submitnewpasswordclient);
router.get('/passwordresetemail',sendresetemail.sendemailpage);
router.get('/passwordreseterror',sendresetemail.sendemailpageerror);
router.post('/forgetpasswordclient',forgetpasswordcontroller.sendresetlinkclient);
module.exports=router;
