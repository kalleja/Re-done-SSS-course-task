'use strict';
   const passport = require('passport');
   const Strategy = require('passport-local').Strategy;
  const userModel = require('../models/userModel');
  const passportJWT =require('passport-jwt');
  const JWTStragey = passportJWT.Strategy;
  const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
   (username, password, done) => {
    
    try {
      const user =  userModel.getUserLogin(username);
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) {
        return done(null, false, {message: 'AUTHENTICATION ERRO.'});
      }
      if (user.password !== password) {
        return done(null, false, {message: 'AUTHENTICATTION ERRO.'});
      }
      return done(null, {...user}, {message: 'ACCESS GRANTED'}); // use spread syntax to create shallow copy to get rid of binary row type
    } catch (err) {
      return done(err);
    }
  }));

  //Todo: JWT Strategy
passport.use(new JWTStragey({
  jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'asd123',
},
(jwtPayload, done) => {
  console.log('payload', jwtPayload);
  const user = userModel.getUser(jwtPayload.id);
  console.log('pl user', user);
  if(user){ return done(null, user);
  }else{ return done(null, false);}
},
));

  

    

   
   module.exports = passport;