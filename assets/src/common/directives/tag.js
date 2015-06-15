angular.module('directives.tag', [])
.directive('tag', function(TagModel) {
  return {
    scope: {
      'object': '=',
      'objectType': '@',
      'callback': '&save'
    },
    templateUrl: 'src/common/templates/tag.tpl.html',
    link: function($scope) {
      $scope.tags = [];
      $scope.newTag = null;

      var key = {};
      key[$scope.objectType] = $scope.object;

      // get all the tags for the displayed object
      TagModel.query(key).$promise.then(
        function success(data, status){
          $scope.tags = data;
        }
      );


      $scope.save = function(){
        console.log('click event caught on button in directive', $scope.newTag);
        $scope.callback({ tags: $scope.newTag });
      };

      // autocomplete, load tags as typed
      $scope.loadTags = function(query) {
        query = {
          where: {
            name: {
              contains: query
            }
          }
        };

        return TagModel.query(query).$promise.then(
          function success(data){
            return data;
          }
        );

      };
    }
  };
});
