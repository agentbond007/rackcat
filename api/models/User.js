var bcrypt = require('bcryptjs');

var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    firstName   : { type: 'string' },
    lastName    : { type: 'string' },
    username    : { type: 'string', unique: true },
    email       : { type: 'email',  unique: true },
    password    : { type: 'string', minLength: 8 },
    accessToken : { type: 'text' },

    // Override toJSON instance method to remove password value
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.accessToken;
      return obj;
    }

  },

  /**
   * Validate password used by the local strategy.
   *
   * @param {string}   password The password to validate
   * @param {Function} next
   */
  validatePassword: function (password, encryptedPassword, cb) {
    bcrypt.compare(password, encryptedPassword, function(err, match) {
      if (err) cb(err);

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  },

  /**
   * Callback to be run before creating a Passport.
   *
   * @param {Object}   passport The soon-to-be-created Passport
   * @param {Function} next
   */
   beforeCreate: function(values, next) {
     bcrypt.genSalt(10, function(err, salt) {
       if (err) return next(err);

       bcrypt.hash(values.password, salt, function(err, hash) {
         if (err) return next(err);

         values.password = hash;
         next();
       });
     });
   }
};

module.exports = User;
