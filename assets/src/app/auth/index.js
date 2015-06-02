angular.module( 'Rackcat.auth', [
])
.config(function config($stateProvider, $urlRouterProvider, AccessLevels){
  $stateProvider
  .state( 'auth', {
    abstract: true,
    data: {
      access: AccessLevels.anon
    },
    views: {
      "main": {
        templateUrl: 'src/common/templates/auth.tpl.html'
      }
    }
  })
  .state('auth.login', {
    url: '/login',
    views: {
      'interior': {
        templateUrl: 'src/app/auth/login.tpl.html',
        controller: 'LoginCtrl',
      }
    }
  });
})
.controller( 'LoginCtrl', function LoginCtrl( $scope, $state, config, Auth ) {
  $scope.errors = [];

  $scope.login = function() {
    $scope.errors = [];
    Auth.login($scope.user).success(function(result) {
      $state.go('dashboard.home');
    }).error(function(err) {
      $scope.errors.push(err);
    });
  };

});
