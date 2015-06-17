/**
 * Item Controllers & States
 *
 * items are things like servers, patch panels, pdu's etc.
 */
angular.module( 'Rackcat.item', [])
.config(function config($stateProvider, $urlRouterProvider, AccessLevels){
  /** Parent state */
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

  /**
   * List all Items
   */
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
      items: function items(ItemModel){
        return ItemModel.find().then(
          function success(items){ return items; },
          function error(error){ return error; }
        );
      }
    }
  })

  /**
   * List a single Item
   */
  .state('item.detail', {
    url: '/detail/:id',
    data: {
      heading: 'Item Detail'
    },
    views: {
      'interior': {
        controller: 'ItemDetailCtrl',
        templateUrl: 'src/app/item/detail.tpl.html',
      }
    },
    resolve: {
      item: function item(ItemModel, $stateParams){
        return ItemModel.findById($stateParams.id).then(
          function success(item){ return item; },
          function error(error){ return error; }
        );
      }
    }
  })

  /**
   * Create a new item
   */
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
      racks: function racks(RackModel){
        return RackModel.query().$promise.then(
          function success(racks){ return racks;},
          function error(error){ return error;}
        )
      },
      itemtypes:function itemtypes(ItemtypeModel){
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

  $scope.deleteItem = function deleteItem($index, item){
    ItemModel.destroy({ id: item.id }).then(
      function success(model){
        $scope.items.splice($index, 1);
       },
      function error(err) {
        console.error(err);
      }
    );

  }
})

.controller('ItemDetailCtrl', function ItemDetailCtrl($state, $scope, config, $log, ItemModel, item){
  $scope.item = item;
})

.controller('ItemCreateCtrl', function ItemCreateCtrl($state, $scope, config, $log, ItemModel, racks, itemtypes){
  $scope.racks = racks;
  $scope.types = itemtypes;

  $scope.fields = [];

  $scope.createItem = function createItem(item){
    item.fields = $scope.fields;

    ItemModel.create(item).then(
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
    console.debug(rack);
    $scope.rack = rack;
    $scope.rackRows = new Array(rack.size);
    console.debug($scope.rackRows);
  }

  $scope.loadTypeFields = function(type){
    console.debug(type);
    $scope.fields = type.fields;
  };
})