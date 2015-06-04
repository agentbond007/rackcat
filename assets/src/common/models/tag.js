angular.module('models.tag', ['lodash', 'services'])

.factory('TagModel', function($resource) {
    return $resource('/api/tag/:id', { 'sort': 'id' });
  });
