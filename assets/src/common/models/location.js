angular.module('models.location', ['lodash', 'services'])

.factory('LocationModel', function($resource) {
    return $resource('/api/location/:id', null, {
      'update': { method: 'PUT' }
    });
  });
