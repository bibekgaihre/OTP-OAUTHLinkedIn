const partner = require('../../config/databaseconnection').partner;
const client=require('../../config/databaseconnection').client;
const Sequelize = require('sequelize');
const randomstring = require('randomstring');

const sendresetemail=require('../controller/sendresetemail');
var token = randomstring.generate({
    length: 100,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
});
exports.sendresetemailpartner = function (partnerid, callback1,callback2,callback3) {

    var link = "http://localhost:3000/forgetpasswordpartner/" + token;
    partner.findOne({ where: { 'partnerid': partnerid } }).then(partner.update({'token':token},{where:{'partnerid':partnerid}})).then((partner) => {
        if (!partner) {
            console.log('PartnerID not registered');
            callback1();
        }
        else if (partner) {
            var email=partner.companyemail;
            console.log('Partner Found');
         sendresetemail.resetemail(email,link,function(err,result){
             callback2();
         },function(err,result){
             callback3();
         });
        
        }
    })
}

exports.sendresetemailclient=function(username,callback1,callback2,callback3){
    var link="http://localhost:3000/forgetpasswordclient/"+token;
    client.findOne({where:{'username':username}}).then(client.update({'token':token},{where:{'username':username}})).then((client)=>{
        if(!client){
            console.log('Client not registered');
            callback1();
        }
        else if(client){
            var email=client.email;
            console.log('Client Found');
            sendresetemail.resetemail(email,link,function(err,result){
                callback2();
            },function(err,result){
                callback3();
            })
        }
    })
}

exports.checktokenandredirectpartner = function (token, callback1, callback2) {

    partner.findOne({ where: { 'token': token } }).then((partner) => {
        if (!partner) {
            console.log('Page not Found');
            callback1();
        }
        else {
            console.log('token found');
            callback2();
        }
    })
}

exports.checktokenandredirectclient=function(token,callback1,callback2){
    client.findOne({where:{'token':token}}).then((client)=>{
        if(!client){
            console.log('Page not Found');
            callback1();
        }
        else{
            console.log('token found');
            callback2();
        }
    })
}

exports.insertnewpasswordpartner=function(token,password,callback1,callback2){
    partner.update({'password':password,'token':null},{where:{'token':token}}).then((partner)=>{
        console.log('password updated');
        callback1();
    }).catch((err)=>{
        if(err) throw err;
        callback2();
    })
}

exports.insertnewpasswordclient=function(token,password,callback1,callback2){
    client.update({'password':password,'token':null},{where:{'token':token}}).then((client)=>{
        console.log('password updated');
        callback1();
    }).catch((err)=>{
        if(err) throw err;
        callback2();
    })
}