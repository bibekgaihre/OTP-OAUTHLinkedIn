const passport=require('passport');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const keys=require('./keys.js');
const connection= new require('./database');
passport.use(
   new LinkedinStrategy({//options for linkedin strategy
    clientID:keys.linkedin.clientID,
    clientSecret:keys.linkedin.clientSecret,
    callbackURL:'/auth/linkedin/redirect',
},(accessToken,refereshToken,profile,done)=>{ //passport callback
    const User = connection.define('user', {
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
        }
      });
      
    connection.sync({
      
      }).then(function(){
        User.findOne({where:{linkedinid:profile.id}}).then((currentUser)=>{
            if(currentUser){
                console.log('user is already registerd');
            }else{
                return User.create({
                    username:profile.displayName,
                    linkedinid:profile.id,
                  })
            }
          });
        }).catch(function(error){
          console.log(error);
      });
}));