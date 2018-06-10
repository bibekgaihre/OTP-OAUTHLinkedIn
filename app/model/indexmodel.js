const partner = require('../../config/databaseconnection').partner;
const client=require('../../config/databaseconnection').client
const indexcontroller = require('../controller/indexcontroller');
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
        if (err) throw err;
        callback2();
    })
}

exports.insertclient = function (username,hash,email,phonenumber,nameoforganization,job,location,token,callback1,callback2) {
    client.create({
        username:username,
        password:hash,
        email:email,
        phonenumber:phonenumber,
        nameoforganization:nameoforganization,
        job:job,
        location:location,
        token:token
    }).then((client)=>{
        console.log('Registration successfull');
        callback1();
    }).catch((err)=>{
        if(err) throw err;
        callback2();
    })
}

exports.activateemailpartner = function (token, callback1,callback2) {
    partner.findOne({ where: { 'token': token } }).then((partner) => {
        if (!partner) {
            console.log('Page not Found');
            callback1();
        }
        else {
            console.log('token found');
            partner.update({ 'confirmed': 1 }, { where: { 'token': token, 'confirmed': 0 } }
        ).then(partner.update({ 'token': null }, { where: { 'token': token, 'confirmed': 1 } })).then((partner) => {
            console.log('Activation successfull');
            callback2();
        }).catch((err) => {
            if (err) throw err;
        })
        }
    })



   
}
exports.activateemailclient=function(token,callback1,callback2){
    client.findOne({where:{'token':token}}).then((client)=>{
        if(!client){
            console.log('Page not found');
            callback1();
        }
        else{
            console.log('Token Found');
        client.update({'confirmed':1},{where:{'token':token,'confirmed':0}}
        ).then(client.update({'token':null},{where:{'token':token,'confirmed':1}})).then((client)=>{
            console.log('Activation successful');
            callback2();
        }).catch((err)=>{
            if(err) throw err;
        })
        }
    })
  
}