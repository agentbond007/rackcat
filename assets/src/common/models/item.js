angular.module('models.item', ['lodash', 'services'])

// .factory('ItemModel', function($resource) {
//     return $resource('/api/tag/:id', { 'sort': 'id' });
//   });

.factory('ItemModel', function($q, $http){
  var _items = undefined;
  var _item = undefined;

  return {
    find: function(filter, force){
      var deferred = $q.defer();

      var params = {
        params: filter || { sort: 'id' }
      };

      if(force){
        _items = undefined;
      }

      if(angular.isDefined(_items)){
        deferred.resolve(_items);
        return deferred.promise;
      }

      $http.get('/api/item', params)
      .success(function(data, status){
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    },

    destroy: function destroy(item){
      var deferred = $q.defer();
      $http.delete('/api/item/' + item.id)
      .success(function(data, status){
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    },

    create: function create(item){
      var deferred = $q.defer();

      $http.post('/api/item', item)
      .success(function(data, status){
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    }
  }
})