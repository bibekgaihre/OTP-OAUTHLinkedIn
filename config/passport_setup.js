const passport=require('passport');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const keys=require('./keys.js');
const User = require('../app/model/linkedinuser.js');

passport.serializeUser((user,done)=>{
  done(null,user.clientid);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  });
  
});


passport.use(
   new LinkedinStrategy({//options for linkedin strategy
    clientID:keys.linkedin.clientID,
    clientSecret:keys.linkedin.clientSecret,
    callbackURL:'/auth/linkedin/redirect',
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true
},(accessToken,refereshToken,profile,done)=>{ //passport callback
  User.findOne({where:{linkedinid:profile.id}}).then((currentUser)=>{
              if(currentUser){
                 done(null,currentUser);
              }else{
             
                var privateProfile = JSON.parse(profile._raw);
                
                var currentUser=User.build({username:profile.displayName,
                  linkedinid:profile.id,
                  work:privateProfile.headline,
                 location:privateProfile.location.name,
                email:profile.emails[0].value});

                currentUser.save().then(()=>{
                  done(null,currentUser);
                }); 
              }
            });

                    
  // User.then(function(){
  //       User.findOne({where:{linkedinid:profile.id}}).then((currentUser)=>{
  //           if(currentUser){
  //               console.log('user is already registerd');
  //           }else{
  //               return User.create({
  //                   username:profile.displayName,
  //                   linkedinid:profile.id,
  //                 })
  //           }
  //         });
  //       }).catch(function(error){
  //         console.log(error);
  //     });
}));