"use strict";
const bcrypt = require('bcrypt');
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtraactJWT = passportJWT.ExtractJwt;

const userModel = require("../models/users");

passport.use(new Strategy(
    async (username, password, done) => {
      try {
        const user = await userModel.getUserLogin(username);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          // consider artificial slowness to simulate slow password check (and anyway slowdown brute force attack)
          // setTimeout(() => { /*done*/ },  Math.floor(Math.random() * 1000));
          return done(null, false, {message: 'Wrong cretendials.'});
        }
        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false, {message: 'Wrong cretendials.'});
        }
        // console.log('deleted pwd', user);
        const strippedUser = user.toObject();
        delete strippedUser.password;
        console.log('deleted pwd', strippedUser);  // make sure that the password do not travel around...
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));
  
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtraactJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'asd123',
        },
        (jwtPayload, done) => {
            try {
                const user = userModel.getUserID(jwtPayload.id);

                if (user === undefined) {
                    return done(null, false, { message: "Undefiend id" });
                }
                delete user.password;
                return done(
                    null,
                    { ...user },
                    { message: "ACCESS GRANTED" }
                );
            } catch (err) {
                return done(err);
            }
        }
    )
);

module.exports = passport;