const express=require('express');
const router=express.Router();


//importing controllers
const indexcontroller=require('../app/controller/indexcontroller');



router.get('/',function(req,res){
    res.render('index.hbs');
});
router.get('/:token',indexcontroller.activateaccount);
router.post('/registerpartner',indexcontroller.registerpartner);



module.exports=router;