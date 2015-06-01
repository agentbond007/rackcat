module.exports = function (req, res, next) {

  var jwt = require('jsonwebtoken');

  if(req.headers.authorization === undefined){
    return res.forbidden({ error: 'forbidden', statusCode: 403, message: 'No API Key specified, expected authorization header, or json object with authorization' });
  }

  var accessToken = req.headers.authorization || req.body.authorization;
  Passport.findOne({ accessToken: accessToken }, function(err, passport){
    if (err) { return next(err); }
    if (!passport) { return res.forbidden({ error: 'forbidden', statusCode: 403, message: 'Invalid API Token, or user.' }); }

    jwt.verify(accessToken, sails.config.jwt.secretKey, function(err, jwtDecoded){
      User.findOneById(jwtDecoded.id, function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.forbidden({ error: 'forbidden', statusCode: 403, message: 'Invalid API Token, or user.' }); }
        return next(null, user);
      });
    });
  });


};
