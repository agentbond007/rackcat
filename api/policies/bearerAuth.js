/**
 * bearerAuth Policy
 *
 * Policy for authorizing API requests. The request is authenticated if the
 * it contains the accessToken in header, body or as a query param.
 * Unlike other strategies bearer doesn't require a session.
 * Add this policy (in config/policies.js) to controller actions which are not
 * accessed through a session. For example: API request from another client
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports = function (req, res, next) {

  // @TODO: add in some sort audit logging for unauthorized requests
  // Log.create({
  //   category: 'request',
  //   user: res.locals.user || null,
  //   ip:  req.connection.remoteAddress,
  //   userAgent:  req.headers['user-agent'],
  //   headers: req.headers,
  //   controller: req.options.controller,
  //   action: req.options.action,
  //   method: req.route.method,
  //   body: req.body,
  //   params: req.params.all(),
  //   url: req.baseUrl+req.route.path,
  //   keys: req.route.keys
  // }).exec(function(err, log){
  //   if(err)
  //     sails.log.error(err);
  // });
  
  return passport.authenticate('bearer', { session: false })(req, res, next);

};
