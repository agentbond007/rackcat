describe('Model::Rack', function(){

  it('should not be empty');

  it('should require `name` to exist');

  it('should require `name` to be unique');

  it('should require `size` to exist');
  
  it('should require `size` to be integer');

  /**
   * Associations Unit Tests
   */
  it('should populate `location` associations');
  it('should populate `items` associations');
  it('should populate `tags` associations');
  it('should populate `comments` associations');
});
