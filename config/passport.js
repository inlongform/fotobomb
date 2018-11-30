const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const User = require("../models/User");
const keys = require("./keys");

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
      passReqToCallback: false
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      // console.log("------------------");
      User.findOne({ "google.id": profile.id })
        .then(user => {
          if (user) {
            return done(null, user);
          }
          const email = profile.emails[0].value;
          const index = email.indexOf("@");
          const handle = email.substring(0, index);

          const newUser = new User({
            name: profile.displayName,
            email: email,
            displayName: handle,
            avatar: profile.photos[0].value,
            google: {
              id: profile.id,
              email: email
            }
          });

          newUser
            .save()
            .then(user => {
              done(null, user);
            })
            .catch(err => done(err, false, err.message));
        })
        .catch(err => done(err, false, err.message));
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: keys.secretOrKey
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }
  )
);
