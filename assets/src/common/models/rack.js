angular.module('models.rack', ['lodash', 'services'])

.factory('RackModel', function($resource) {
    return $resource('/api/rack/:id', { 'sort': 'id' });
  })
