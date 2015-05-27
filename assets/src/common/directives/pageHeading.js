angular.module('directives.pageHeading', [])
.directive('pageHeading', function($state, config){
  return {
    restrict: 'A',
    link: function(scope, elem, attr){
      var heading = $state.current.data.heading || config.heading;
      return elem.html(heading);
    }
  };
})
