angular.module('directives.comment', [])
.directive('comment', function(CurrentUser, CommentModel) {
  return {
    scope: {
      'object': '=',
      'objectType': '@'
    },
    templateUrl: 'src/common/templates/comment.tpl.html',
    link: function($scope) {
      $scope.comments = [];
      $scope.newComment = null;
      
      var key = {};
      key[$scope.objectType] = $scope.object;

      CommentModel.query(key).$promise.then(
        function success(comments){
          $scope.comments = comments;
        }
      );

      $scope.leaveComment = function() {
       var comment = {
         comment: $scope.newComment,
         user: CurrentUser.user().id
       };

       comment[$scope.objectType] = $scope.object;
       CommentModel.save(comment,
       function success(comment){
         $scope.comments.push(comment);
         $scope.newComment = null;
       });
      };
    }
  };
});
