describe('Model::User', function(){

  it('should not be empty', function(done){
    User.find().exec(function(err, users){
      users.length.should.be.eql(fixtures.user.length);
      done();
    });
  });

  it('should require `username` to be unique');
  it('should require `email` to be a valid email address');
});
