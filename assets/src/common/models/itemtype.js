angular.module('models.itemtype', ['lodash', 'services'])

.factory('ItemtypeModel', function($resource) {
  return $resource('/api/itemtype/:id', { 'sort': 'id' });
});
