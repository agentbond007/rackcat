angular.module( 'models.auth', ['lodash'])



.factory('Auth', function($q, $http, LocalService, AccessLevels, lodash) {
  function setToken(user){
    LocalService.set( 'auth_token', JSON.stringify(user) );
  };
  return {

    /**
     * check if the route requires authorization,
     * if it doesn't return true (user is authorized)
     * otherwise check if the user is authenticated.
     * expects boolean return.
     **/
    authorize: function(access) {
      if (access === AccessLevels.user) {
        return this.isAuthenticated();
      } else {
        return true;
      }
    },

    /**
     * check for the auth_token in LocalStorage.
     **/
    isAuthenticated: function isAuthenticated(){
      return LocalService.get('auth_token');
    },

    /**
     * POST to /auth/login with the credentials
     * on successful login, assign the auth_token
     * to localstorage.
     **/
    login: function login(credentials){
      var login = $http.post('/api/auth/login', credentials);
      login.success(function(result){
        console.log(result);
        setToken(result);
      });
      return login;
    },

    /**
     * Deletes a auth_token which ends up
     * forcing a redirect to auth.login state.
     **/
    logout: function logout(){
      LocalService.unset('auth_token');
    },

    /**
     * Registers a user
     **/
    register: function register(user){
      var deferred = $q.defer();
      var _user = undefined;

      if(angular.isDefined(_user)){
        deferred.resolve(_user);
        return deferred.promise;
      }

      $http.post('/api/auth/register', user)
      .success(function(data, status){
        setToken(data);
        deferred.resolve(data);
      })
      .error(function(data, status){
        deferred.reject(data);
      });

      return deferred.promise;
    }
  };

})

.factory('AuthInterceptor', function($q, $injector) {
  var LocalService = $injector.get('LocalService');

  return {
    request: function(config) {
      var token;
      if (LocalService.get('auth_token')) {
        token = angular.fromJson(LocalService.get('auth_token')).token;
      }
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        LocalService.unset('auth_token');
        $injector.get('$state').go('auth.login');
      }
      return $q.reject(response);
    }
  };
})
.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
