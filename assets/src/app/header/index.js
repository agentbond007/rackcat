angular.module( 'Rackcat.header', [
])

.controller( 'HeaderCtrl', function HeaderController( $scope, $state, config, Auth ) {
    $scope.auth = Auth;

    $scope.logout = function() {
      Auth.logout();
      $state.go('auth.login');
    };
});
