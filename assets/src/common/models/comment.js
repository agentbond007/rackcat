angular.module('models.comment', ['lodash', 'services'])

.factory('CommentModel', function($resource) {
    return $resource('/api/comment/:id', { 'sort': 'id' });
  });
