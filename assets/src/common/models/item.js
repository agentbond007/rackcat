angular.module('models.item', ['lodash', 'services'])

.factory('ItemModel', function($q, $http){
  var _items = undefined;
  var _item = undefined;

  return {

    /**
     * Find more than one item
     *
     * @param {Object} filter - sailsjs syntax query filtering
     * @param {Boolean} force - force result
     */
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

    /**
     * find a single item given an id as the first param
     *
     * @param {String} id - the id of the item
     * @param {Object} filter - additional filtering using sailsjs query syntax
     * @param {Boolean} force - force result
     */
    findById: function(id, filter, force){
      var deferred = $q.defer();

      var params = {
        params: filter || { sort: 'id' }
      };

      if(force){
        _item = undefined;
      }

      if(angular.isDefined(_item)){
        deferred.resolve(_item);
        return deferred.promise;
      }

      $http.get('/api/item/' + id, params)
      .success(function(data, status){
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    },

    /**
     * destroy an item given an item object
     *
     * @param: {Object} item - item object, with bare minimum of id
     */
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

    /**
     * create an item given a new item object
     *
     * @param: {Object} item - new item object
     */
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