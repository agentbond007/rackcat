angular.module( 'Rackcat.user', [])
.config(function config($stateProvider, $urlRouterProvider, AccessLevels){
  $stateProvider
  .state( 'user', {
    url: '/user',
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
  .state('user.list', {
    url: '',
    data: {
      heading: "Users"
    },
    views: {
      "interior": {
        controller: 'UserListCtrl',
        templateUrl: 'src/app/user/list.tpl.html',

      }
    },
    resolve: {
      users: function(User){
        return User.find().then(
          function success(users){ return users; },
          function error(error){ return error; }
        );
      }
    }
  })
  .state('user.create', {
    url: '/create',
    data: {
      heading: "Create User",
      views: {
        "interior": {
          controller: 'UserCreateCtrl',
          templateUrl: 'src/app/user/create.tpl.html'
        }
      }
    }
  })
})

.controller( 'UserListCtrl', function UserListCtrl( $scope, $state, config, User, users){
  $scope.errors = [];
  $scope.users = users;

  $scope.deleteItem = function deleteItem($index, user){
    User.delete({ id: user.id }).then(
      function success(model){
        console.log(model);
        $scope.users.splice($index, 1);
       },
      function error(err) {
        console.error(err);
        $scope.errors.push(err);
      }
    );
  }
})
.controller( 'UserCreateCtrl', function UserCreateCtrl($scope, $state, config, User){
  $scope.user = {};
  $scope.createUser = function createUser(){
    User.create($scope.user,
      function success(user){
        $state.go('user.detail', {id: user.id });
      },
      function error(err){
        if(err.data.error === "E_VALIDATION"){
          console.error(err.data);
          angular.forEach(err.data.invalidAttributes.name, function(value, key){
            console.error(value.message);
            $scope.errors.push(value.message);
          });
        }
    });
  };
})