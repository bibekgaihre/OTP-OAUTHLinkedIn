const database= new require('../../config/databaseconnection.js');
const connection = database.connection;
var User =connection.define('user', {
      clientid:{
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
      linkedinid: {
        type: connection.Sequelize.STRING,
      },

      location: {
        type: connection.Sequelize.STRING,
      },
    
    work: {
        type: connection.Sequelize.TEXT,
      },

      email: {
        type: connection.Sequelize.STRING,
      },

});

 connection.sync({
   
 })   

module.exports = User;