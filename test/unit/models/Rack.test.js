describe('Model::Rack', function(){

  it('should not be empty', function(done){
    Rack.find().exec(function(err, racks){
      if(err)
        console.log(err);
      racks.length.should.be.eql(fixtures.rack.length);
      done();
    });
  });

  it('should require `name` to exist', function(done){
    Rack.create({
      name: null,
    }).exec(function(err, location){
      err.should.have.property('invalidAttributes');
      done();
    });
  });

  it('should require `name` to be unique', function(done){
    Rack.create(fixtures.rack[0])
    .exec(function(err, rack){
      err.should.have.property('invalidAttributes');
      err.invalidAttributes.name[0].rule.should.equal('unique');
      done();
    });
  });

  it('should require `size` to exist and be an integer', function(done){
    Rack.create({
      name: "Rack 3",
      size: null
    }).exec(function(err, rack){
      err.should.have.property('invalidAttributes');
      // validation failure for null !== integer
      err.invalidAttributes.size[0].rule.should.equal('integer');
      // validation failure for required
      err.invalidAttributes.size[1].rule.should.equal('required');
      done();
    });
  });


  /**
   * Associations Unit Tests
   */
  it('should populate `location` associations', function(done){
    Rack.find().populate('location').exec(function(err, racks){
      racks[0].location.should.have.property('name');
      racks[0].location.name.should.be.eql(fixtures.location[racks[0].location.id-1].name);
      done();
    });
  });

  it('should populate `items` associations');
  it('should populate `tags` associations');
  it('should populate `comments` associations', function(done){
    Rack.find().populate('comments').exec(function(err, racks){
      racks[0].comments.length.should.be.eql(fixtures.rack[0].comments.length);
      done();
    });
  });
});
