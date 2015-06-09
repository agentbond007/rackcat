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
  })
  .state('auth.register', {
    url: '/register',
    views: {
      'interior': {
        templateUrl: 'src/app/auth/register.tpl.html',
        controller: 'RegisterCtrl'
      }
    }
  })

})
.controller( 'LoginCtrl', function LoginCtrl( $scope, $state, config, Auth ) {
  $scope.errors = [];

  $scope.login = function() {
    $scope.submitDisabled = true;
    $scope.errors = [];
    Auth.login($scope.user).success(function(result) {
      $state.go('dashboard.home');
    }).error(function(err) {
      $scope.submitDisabled = false;
      $scope.errors.push(err);
    });
  };

})

.controller( 'RegisterCtrl', function RegisterCtrl( $scope, $state, config, Auth){
  $scope.errors = [];

  $scope.register = function(){
    $scope.errors = [];
    $scope.submitDisabled = true;

    Auth.register($scope.user).then(
      function success(result){
        $state.go('dashboard.home');
      },
      function error(err){
        console.error(err);
        $scope.submitDisabled = false;
        $scope.errors.push(err);
      }
    );
  }
})
