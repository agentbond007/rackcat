/**
 * Audit logging system
 *
 * logs every HTTP request that hits protected APIs, these are defined by the
 * 'logger' setting on config/policies.js. If you want something logged, just
 * add it to the specific controller or controller and action.
 */
module.exports = function(req, res, next){
  next();

  Log.create({
    category: 'request',
    user: res.locals.user || null,
    ip:  req.connection.remoteAddress,
    userAgent:  req.headers['user-agent'],
    headers: req.headers,
    controller: req.options.controller,
    action: req.options.action,
    method: req.route.method,
    body: req.body,
    params: req.params.all(),
    url: req.baseUrl+req.route.path,
    keys: req.route.keys
  }).exec(function(err, log){
    if(err)
      sails.log.error(err);
  });
};
