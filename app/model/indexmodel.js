const partner = require('../../config/databaseconnection').partner;
const indexcontroller=require('../controller/indexcontroller');
const Sequelize = require('sequelize');

exports.insertpartner = function (partnerid, hash, companyemail, phonenumber, nameofagency, city, country, address, zipcode, token, callback1, callback2) {
    partner.create({
        partnerid: partnerid,
        password: hash,
        companyemail: companyemail,
        phonenumber: phonenumber,
        nameofagency: nameofagency,
        city: city,
        country: country,
        address: address,
        zipcode: zipcode,
        token: token
    }).then((partner) => {
        console.log('Registration successfull');
        callback1();
    }).catch((err) => {
       if(err) throw err;
        callback2();
    })
}

exports.activateemail=function(token,callback){
  partner.update({'confirmed':1},{where:{'token':token,'confirmed':0}}
  ).then(partner.update({'token':null}, {where:{'token':token,'confirmed':1}})).then((partner)=>{
      console.log('Activation successfull');
      callback();
  }).catch((err)=>{
      if(err) throw err;
  })
}
