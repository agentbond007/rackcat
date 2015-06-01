/*
 * Bearer Authentication Protocol
 *
 * Bearer Authentication is for authorizing API requests. Once
 * a user is created, a token is also generated for that user
 * in its passport. This token can be used to authenticate
 * API requests.
 *
 */

exports.authorize = function(token, done) {
var jwt = require('jsonwebtoken');

  // @TODO: Enable User Lookup by supplied JWT
  //  if the decrypted JWT matches the details and jwt in the passport table
  //  for the user, authenticate them.
  console.log(token);
  Passport.findOne({ accessToken: token }, function(err, passport) {
    if (err) { return done(err); }
    if (!passport) { return done(null, false); }

    jwt.verify(token, sails.config.jwt.secretKey, function(err, jwtDecoded){
      sails.log.debug(jwtDecoded);

      User.findOneById(passport.user, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all' });
      });

    });

  });

};
