angular.module( 'Rackcat.rack', [])
.config(function config($stateProvider, $urlRouterProvider, AccessLevels){
  $stateProvider
  .state( 'rack', {
    url: '/rack',
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
  .state('rack.list', {
    url: '',
    data: {
      heading: "Racks"
    },
    views: {
      "interior": {
        controller: 'RackListCtrl',
        templateUrl: 'src/app/rack/list.tpl.html',

      }
    },

    resolve: {
      racks: function(RackModel){
        return RackModel.query().$promise.then(
          function success(racks){ return racks; },
          function error(error){ return error; }
        );
      }
    }
  })
  .state('rack.create', {
    url: '/create',
    data: {
      heading: 'Create Rack'
    },
    views: {
      'interior': {
        controller: 'RackCreateCtrl',
        templateUrl: 'src/app/rack/create.tpl.html'
      }
    },
    resolve: {
      locations: function(LocationModel){
        return LocationModel.query().$promise.then(
          function success(locations){ return locations; },
          function error(error){ return error; }
        );
      },
      tags: function(TagModel){
        return TagModel.query().$promise.then(
          function success(tags){ return tags; },
          function error(error){ return error; }
        );
      }
    }
  });

})
.controller('RackListCtrl', function RackListCtrl($state, $scope, config, $log, RackModel, racks) {
  $scope.racks = racks;

  $scope.deleteItem = function($index, rack){
    RackModel.delete({ id: rack.id }).$promise.then(
      function success(model){
        $scope.racks.splice($index, 1);
       },
      function error(err) {
        console.error(err);
      }
    );
  };

})

.controller('RackCreateCtrl', function RackCreateCtrl($state, $scope, config, $log, $http, RackModel, locations, TagModel, tags){
  $scope.errors = [];
  $scope.newRack = {
    size: 1,
    tags: []
  };
  $scope.locations = locations;


  $scope.loadTags = function(query) {
    console.log(query);
    query = {
      name: {
        contains: query
      }
    };
    query = '/api/tag?where=' + JSON.stringify(query);
    console.log(query);
    return $http.get(query);
  };

  $scope.rows = function() {
    return new Array($scope.newRack.size);
  };

  $scope.createRack = function createRack(){
      RackModel.save($scope.newRack,
        function success(rack){
          $state.go('rack.detail', {id: rack.id });
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
