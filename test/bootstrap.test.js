var Sails = require('sails');
var Barrels = require('barrels');
require('should');

before(function(done){
  Sails.lift({
    log: {
      level: 'error'
    },
    port: 9999,
    connections: {
      test: {
        adapter: 'sails-memory',
      }
    },
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
    console.log('beginning populate');
    barrels.populate(['User'], function(err){
      console.log('done populating User');
      if(err){
        done(err);
      }

      barrels.populate(['Passport', 'location', 'rack', 'tag', 'comment'], function(err){
        console.log('done populating everything else');
        if(err){
          done(err);
        }
        done(err, sails);
      });
    });
  });
});

after(function(done){
  console.log();
  Sails.lower(done);
});
