angular.module('models.tag', ['lodash', 'services'])

.factory('TagModel', function($resource) {
    return $resource('/api/tag/:id', { 'sort': 'id' });
  });
// .factory('TagModel', function TagModel($q, $http){
//   return {
//     find: function(filter, force){
//       var deferred = $q.defer();

//       var params = {
//         params: filter || { sort: 'id' }
//       };

//       $http.get('/api/tag', params)
//       .success(function(data, status){
//         deferred.resolve(data);
//       })
//       .error(function(data, status){
//         deferred.reject(data);
//       });

//       return deferred.promise;
//     }
//   }
// })