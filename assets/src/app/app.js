angular.module( 'Rackcat', [
    'ui.router',
    'angularMoment',
    'ngTagsInput',
    'lodash',
    'angularMoment',
    'ui.bootstrap',
    'ngResource',
    'services',
    'models',
    'directives',
    'Rackcat.header',
    'Rackcat.dashboard',
    'Rackcat.rack',
    'Rackcat.location',
    'Rackcat.itemtype',
    'Rackcat.auth'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  // $urlRouterProvider.otherwise(function($injector, $location){
  //   if (!Auth.authorize(toState.data.access)) {
  //     event.preventDefault();
  //     $state.go('auth.login');
  //   }else{
  //     $stage.go('dashboard.home');
  //   }
  // });
})


.run( function run($rootScope, $state, Auth) {
    moment.locale('en');

    /**
     * check for authorizations, if state has anon accesslevel, let it through
     * otherwise check for an access_token, otherwise redirect to auth.login
     */
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (!Auth.authorize(toState.data.access)) {
        event.preventDefault();
        $state.go('auth.login');
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(){
      var data = $state.$current.data;
      $rootScope.data = data;
    });
})

.controller( 'AppCtrl', function AppCtrl ( $scope, config ) {
    config.currentUser = window.currentUser;
});
