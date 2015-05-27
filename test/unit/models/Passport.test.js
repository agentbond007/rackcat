describe('Model::Passport', function(){

  it('should not be empty', function(done){
    Passport.find().populate('user').exec(function(err, passports){
      passports.length.should.be.eql(fixtures.passport.length);
      done();
    });
  });

  it('should validate a given correct password', function(done){
    Passport.findOne({
      protocol : 'local',
      user     : 1
    }, function (err, passport) {
      if (passport) {
        passport.validatePassword(fixtures.passport[0].password, function (err, res) {
            res.should.equal(true);
            done();
        });
      }
    });
  });

  it('should validate a given incorrect password', function(done){
    Passport.findOne({
      protocol : 'local',
      user     : 1
    }, function (err, passport) {
      if (passport) {
        passport.validatePassword('some bogus password', function (err, res) {
            res.should.equal(false);
            done();
        });
      }
    });
  });
  
});
