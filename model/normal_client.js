const connection= new require('../config/database.js');
var normal_client =connection.define('normal_client', {
      normal_clientid:{
       type:connection.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: connection.Sequelize.STRING,
        validate:{
          len:[2,150],
        }
      },
      password: {
        type: connection.Sequelize.STRING,
      },

      organization_name: {
        type: connection.Sequelize.TEXT,
      },

      job: {
        type: connection.Sequelize.STRING,
      },

      phonenumber:{
        type:connection.Sequelize.STRING,
      },

      email: {
        type: connection.Sequelize.STRING,
      },

});

 connection.sync({
   
 })   

module.exports.getnormalclient= ()=>normal_client;
module.exports.insertclient =(username,email,phonenumber,organization_name, job,location,password,registerSuccess,registerFail)=> normal_client.create({
      username,
       email,
       phonenumber,
       organization_name,
       job,
       location,
       password
    }).then((insertclient)=>{
      registerSuccess();
    }).catch((err)=>{
      registerFail();
    });



