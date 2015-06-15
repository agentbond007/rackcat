angular.module( 'Rackcat.item', [])
.config(function config($stateProvider, $urlRouterProvider, AccessLevels){
  $stateProvider

  .state( 'item', {
    url: '/item',
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
  .state('item.list', {
    url: '',
    data: {
      heading: "Items"
    },
    views: {
      "interior": {
        controller: 'ItemListCtrl',
        templateUrl: 'src/app/item/list.tpl.html',

      }
    },

    resolve: {
      items: function(ItemModel){
        return ItemModel.find().then(
          function success(items){ return items; },
          function error(error){ return error; }
        );
      }
    }
  })
  .state('item.create', {
    url: '/create',
    data: {
      heading: "Create Item",
    },
    views: {
      "interior": {
        controller: 'ItemCreateCtrl',
        templateUrl: 'src/app/item/create.tpl.html'
      }
    },
    resolve: {
      racks: function(RackModel){
        return RackModel.query().$promise.then(
          function success(racks){ return racks;},
          function error(error){ return error;}
        )
      },
      itemtypes:function(ItemtypeModel){
        return ItemtypeModel.query().$promise.then(
          function success(itemtypes){ return itemtypes;},
          function error(error){ return error;}
        )
      }
    }
  })
})

.controller('ItemListCtrl', function ItemListCtrl($state, $scope, config, $log, ItemModel, items){
  $scope.items = items;
})

.controller('ItemCreateCtrl', function ItemCreateCtrl($state, $scope, config, $log, ItemModel, racks, itemtypes){
  $scope.racks = racks;
  $scope.types = itemtypes;

  $scope.fields = [];

  $scope.createItem = function createItem(item){
    ItemModel.create($scope.newItem).then(
      function success(item){
        $state.go('item.detail', {id: item.id });
      },
      function error(err){
        if(err.data.error === "E_VALIDATION"){
          console.error(err.data);
          angular.forEach(err.data.invalidAttributes.name, function(value, key){
            console.error(value.message);
            $scope.errors.push(value.message);
          });
        }
      }
    );

  };

  $scope.loadRack = function loadRack(rack){
    $scope.rack = rack;
  }

  $scope.loadTypeFields = function(type){
    console.debug(type);
    $scope.fields = type.fields;
  };
})