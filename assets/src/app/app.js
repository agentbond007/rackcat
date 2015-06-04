angular.module( 'Rackcat', [
    'ui.router',
    'angularMoment',
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

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {

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
})

.controller( 'AppCtrl', function AppCtrl ( $scope, config ) {
    config.currentUser = window.currentUser;
});
