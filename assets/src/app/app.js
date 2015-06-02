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

    'Rackcat.rack',
    'Rackcat.location',
    'Rackcat.itemtype'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {

})

.run( function run () {
    moment.locale('en');
})

.controller( 'AppCtrl', function AppCtrl ( $scope, config ) {
    config.currentUser = window.currentUser;
});
