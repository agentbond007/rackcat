describe('Model::Comment', function(){

  it('should not be empty', function(done){
    Comment.find().exec(function(err, comments){
      comments.length.should.be.eql(fixtures.comment.length);
      done();
    });
  });

  it('should require `comment` to exist', function(done){
    Comment.create({
      comment: null,
    }).exec(function(err, comment){
      err.should.have.property('invalidAttributes');
      done();
    });
  });

  /**
   * Associations Unit Tests
   */
  it('should populate `rack` associations', function(done){
    Comment.find({
      where: {
        rack: {
          'not': null
        }
      }
    }).populate('rack').exec(function(err, comments){
      comments.should.matchEach(function(comment){
        comment.rack.name.should.be.eql( fixtures.rack[comment.rack.id-1].name );
      });
      done();
    });
  });

  it('should populate `location` associations', function(done){
    Comment.find({
      where: {
        location: {
          'not': null
        }
      }
    }).populate('location').exec(function(err, comments){
      comments.should.matchEach(function(comment){
        comment.location.name.should.be.eql( fixtures.location[comment.location.id-1].name );
      });
      done();
    });
  });

  it('should populate `item` associations');
});
