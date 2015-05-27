describe('Model::Locaton', function(){

  it('should not be empty', function(done){
    Location.find().exec(function(err, locations){
      locations.length.should.be.eql(fixtures.location.length);
      done();
    });
  });

  it('should require `name` to exist', function(done){
    Location.create({
      name: null,
    }).exec(function(err, location){
      err.should.have.property('invalidAttributes');
      done();
    });
  });

  it('should require `name` to be unique', function(done){
    Location.create({
      name: fixtures.location[0].name
    }).exec(function(err, location){
      err.should.have.property('invalidAttributes');
      err.invalidAttributes.name[0].rule.should.equal('unique');
      done();
    });
  });


/**
 * Associations Unit Tests
 */

  it('should populate `racks` association', function(done){
    Location.find().populate('racks').exec(function(err, locations){
      locations[0].racks.length.should.be.eql(fixtures.location[0].racks.length);
      done();
    });
  });

  // multiple many-many associations aren't working right now for Barrels,
  // need to discover why.
  it('should populate `tags` association');

  it('should populate `comments` association', function(done){
    Location.find().populate('comments').exec(function(err, locations){
      locations[0].comments.length.should.be.eql(fixtures.location[0].comments.length);
      done();
    });
  });
});
