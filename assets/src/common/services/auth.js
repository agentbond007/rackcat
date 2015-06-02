angular.module( 'services.auth', ['lodash'])

.factory('Auth', function($http, LocalService, AccessLevels, lodash) {
  return {
    authorize: function(access) {
      if (access === AccessLevels.user) {
        return this.isAuthenticated();
      } else {
        return true;
      }
    },
    isAuthenticated: function isAuthenticated(){
      return LocalService.get('auth_token');
    },
    login: function login(credentials){
      var login = $http.post('/api/auth/login', credentials);
      login.success(function(result){
        LocalService.set('auth_token', JSON.stringify(result));
      });
      return login;
    },
    logout: function logout(){
      LocalService.unset('auth_token');
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
