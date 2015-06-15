angular.module('directives.rackLayout', [])
.directive('rackLayout', function(RackModel) {
  return {
    restrict: 'A',
    scope: {
      'rack': '=',
      'size': '=',
      'edit': '@'
    },
    templateUrl: 'src/common/templates/rackLayout.tpl.html',
    link: function($scope, elem, attrs) {
      $scope.rows = function() {
        return new Array($scope.size);
      };
    }
  };
});