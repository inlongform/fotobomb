const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/User");
const keys = require("./keys");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: keys.secretOrKey
    },
    (jwt_payload, done) => {
      let query;

      if (jwt_payload._id) {
        query = User.findById(jwt_payload._id);
      } else {
        query = User.findOne({ "google.id": jwt_payload.google.id });
      }
      query
        .then(user => {
          // console.log("user", user);
          if (user) {
            return done(null, user);
          }
          const email = jwt_payload.email;
          const index = email.indexOf("@");
          const handle = email.substring(0, index);

          const newUser = new User({
            name: jwt_payload.name,
            email: email,
            displayName: handle,
            avatar: jwt_payload.avatar,
            google: {
              id: jwt_payload.google.id,
              email: jwt_payload.google.email
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
