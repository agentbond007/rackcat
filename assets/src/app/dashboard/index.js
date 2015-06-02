angular.module( 'Rackcat.dashboard', [
])
.config(function config($stateProvider, $urlRouterProvider, AccessLevels){
  $stateProvider
  .state( 'dashboard', {
    abstract: true,
    data: {
      access: AccessLevels.user
    },
    views: {
      "main": {
        templateUrl: 'src/common/templates/layout.tpl.html'
      }
    }
  })
  .state('dashboard.home', {
    url: '/dashboard',
    views: {
      'interior': {
        templateUrl: 'src/app/dashboard/index.tpl.html',
        controller: 'DashboardCtrl',
      }
    }
  });
})
.controller( 'DashboardCtrl', function DashboardCtrl( $scope, $state, config) {


});
