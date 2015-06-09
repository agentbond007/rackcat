angular.module( 'models.user', [])

.factory('User', function($q, $http) {
  var _users = undefined;
  var _user = undefined;

  return {
    find: function(filter, force){
      var deferred = $q.defer();

      var params = {
        params: filter || { sort: 'id' }
      };

      if(force){
        _users = undefined;
      }

      if(angular.isDefined(_users)){
        deferred.resolve(_users);
        return deferred.promise;
      }

      $http.get('/api/user', params)
      .success(function(data, status){
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    },

    findById: function(id, filter, force){
      var deferred = $q.defer();

      var params = {
        params: filter || { sort: 'id' }
      };

      if(force){
        _user = undefined;
      }

      if(angular.isDefined(_user)){
        deferred.resolve(_user);
        return deferred.promise;
      }

      $http.get('/api/user/' + id, params)
      .success(function(data, status){
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    },

    delete: function(user){
      var deferred = $q.defer();

      $http.delete('/api/user/' + user.id)
      .success(function(data, status){
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    },

    create: function(user){
      var deferred = $q.defer();

      $http.post('/api/user', user)
      .success(function(data, status){
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    }
  }
});