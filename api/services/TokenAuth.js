var jwt = require('jsonwebtoken');
module.exports = {
  issueToken: function issueToken(payload){
    return jwt.sign(
      payload,
      sails.config.jwt.secretKey
    );
  },
  verifyToken: function verifyToken(token, verified){
    return jwt.verify(
      token,
      sails.config.jwt.secretKey,
      {},
      verified
    );
  }
};
