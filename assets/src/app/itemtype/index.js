angular.module( 'Rackcat.itemtype', [])
.config(function config($stateProvider, $urlRouterProvider){
  $stateProvider

  .state( 'itemtype', {
    url: '/itemtype',
    abstract: true,
    views: {
      "main": {
        templateUrl: 'src/app/itemtype/index.tpl.html'
      }
    }
  })

  .state('itemtype.list', {
    url: '',
    data: {
      heading: 'Item Types',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    views: {
      'interior': {
        controller: 'ItemtypeListCtrl',
        templateUrl: 'src/app/itemtype/list.tpl.html',
      }
    },
    resolve: {
      itemtypes: function(ItemtypeModel){
        return ItemtypeModel.query().$promise.then(
          function success(itemtypes){
            console.error(itemtypes);
            return itemtypes;
          },
          function error(error){
            console.error(error);
            return error;
          }
        );
      }
    }
  })
  .state('itemtype.detail', {
    url: '/detail/:id',
    data: {
      heading: 'Item Type Detail'
    },
    views: {
      'interior': {
        controller: 'ItemtypeDetailCtrl',
        templateUrl: 'src/app/itemtype/detail.tpl.html',
      }
    },
    resolve: {
      itemtype: function(ItemtypeModel, $stateParams){
        return ItemtypeModel.get({ id: $stateParams.id }).$promise.then(
          function success(itemtype){ return itemtype; },
          function error(error){ return error; }
        );
      }
    }
  })

  .state('itemtype.create', {
    url: '/create',
    data: {
      heading: 'Create Item Type'
    },
    views: {
      'interior': {
        controller: 'ItemtypeCreateCtrl',
        templateUrl: 'src/app/itemtype/create.tpl.html'
      }
    }
  });


})
.controller('ItemtypeListCtrl', function ItemtypeListCtrl( $scope, $state, $modal, config, ItemtypeModel, itemtypes) {
  $scope.currentUser = config.currentUser;
  $scope.itemtypes = itemtypes;

  $scope.deleteItem = function($index, itemtype){
    ItemtypeModel.delete({ id: itemtype.id }).$promise.then(
      function success(model){
        console.log(model);
        $scope.itemtypes.splice($index, 1);
       },
      function error(err) {
        console.error(err);
      }
    );
  };



})

.controller('ItemtypeDetailCtrl', function ItemtypeDetailCtrl( $state, $scope, config, ItemtypeModel, itemtype){
  $scope.currentUser = config.currentUser;
  $scope.itemtype = itemtype;
})

.controller('ItemtypeCreateCtrl', function ItemtypeCreateCtrl( $state, $scope, config, ItemtypeModel){
  $scope.currentUser = config.currentUser;
  $scope.errors = [];
  $scope.itemtype = {
    fields: [
    ]
  };

  $scope.addField = function(){
    var field = {
      class: $scope.newField.class,
      id: $scope.newField.id,
      name: $scope.newField.name,
      placeholder: $scope.newField.placeholder,
      type: $scope.newField.type,
      required: $scope.newField.required,
    };

    $scope.itemtype.fields.push(field);
  };

  $scope.removeField = function(index){
    $scope.itemtype.fields.splice(index, 1);
  };

  $scope.createItemtype = function createItemtype(){
    ItemtypeModel.save($scope.itemtype,
      function success(itemtype){
        $state.go('itemtype.detail', {id: itemtype.id });
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
