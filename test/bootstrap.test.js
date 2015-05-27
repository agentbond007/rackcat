var Sails = require('sails');
var Barrels = require('barrels');
require('should');

before(function(done){
  Sails.lift({
    log: {
      level: 'error'
    },
    port: 9999,
    models: {
      connection: 'test',
      migrate: 'drop'
    },
    hooks: {
      grunt: false
    }
  },
  function(err, sails){
    if(err)
      return done(err);

    var barrels = new Barrels();

    fixtures = barrels.data;
    barrels.populate(function(err){
      done(err, sails);
    });

  });
});

after(function(done){
  console.log();
  Sails.lower(done);
});
