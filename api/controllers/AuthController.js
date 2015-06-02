/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {

  login: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      return res.json(401, {err: 'username and password required'});
    }

    User.findOneByUsername(username, function(err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid username or password'});
      }

      User.validatePassword(password, user.password, function(err, valid) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }

        if (!valid) {
          return res.json(401, {err: 'invalid username or password'});
        } else {
          res.json({user: user, token: TokenAuth.issueToken({sid: user.id})});
        }
      });
    });
  },

  logout: function (req, res) {

  },
  register: function(req, res){
    //TODO: Do some validation on the input
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match'});
    }

    User.create({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password
    }).exec(function(err, user) {
      if (err) {
        res.json(err.status, {err: err});
        return;
      }
      if (user) {
        var token = TokenAuth.issueToken( { sid: user.id } );
        user.accessToken = token;
        user.save(function(){
          res.json({
            user: user,
            token: token
          });
        });
      }
    });
  }
};

module.exports = AuthController;
