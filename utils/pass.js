"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtraactJWT = passportJWT.ExtractJwt;

const userModel = require("../models/users");

passport.use(
    new Strategy(
        (username, password, done) => {
            try {
                const user = userModel.getUserLogin(username);
                console.log("Local strategy", user); // result is binary row
                if (user === undefined) {
                    return done(null, false, { message: "Undiefied email." });
                }
                if (user.password !== password) {
                    return done(null, false, {
                        message: "Undefiend password."
                    });
                }
                delete user.password;
                return done(
                    null,
                    { ...user },
                    { message: "Logged In" }
                ); // use spread syntax to create shallow copy to get rid of binary row type
            } catch (err) {
                return done(err);
            }
        }
    )
);

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