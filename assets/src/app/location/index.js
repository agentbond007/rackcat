angular.module( 'Rackcat.location', [])
.config(function config($stateProvider, $urlRouterProvider){
  $stateProvider

  .state( 'location', {
    url: '/location',
    abstract: true,
    views: {
      "main": {
        templateUrl: 'src/app/location/index.tpl.html'
      }
    }
  })

  .state('location.list', {
    url: '',
    data: {
      heading: 'Locations'
    },
    views: {
      'interior': {
        controller: 'LocationListCtrl',
        templateUrl: 'src/app/location/list.tpl.html',
      }
    },
    resolve: {
      locations: function(LocationModel){
        return LocationModel.query().$promise.then(
          function success(locations){ return locations; },
          function error(error){ return error; }
        );
      }
    }
  })

  .state('location.detail', {
    url: '/detail/:id',
    data: {
      heading: 'Location Detail'
    },
    views: {
      'interior': {
        controller: 'LocationDetailCtrl',
        templateUrl: 'src/app/location/detail.tpl.html',
      }
    },
    resolve: {
      location: function(LocationModel, $stateParams){
        return LocationModel.get({ id: $stateParams.id }).$promise.then(
          function success(location){ return location; },
          function error(error){ return error; }
        );
      }
    }
  })

  .state('location.create', {
    url: '/create',
    data: {
      heading: 'Create Location'
    },
    views: {
      'interior': {
        controller: 'LocationCreateCtrl',
        templateUrl: 'src/app/location/create.tpl.html'
      }
    }
  })

  .state('location.edit', {
    url: '/edit/:id',
    data: {
      heading: 'Edit Location'
    },
    views: {
      'interior': {
        controller: 'LocationEditCtrl',
        templateUrl: 'src/app/location/edit.tpl.html',
      }
    },
    resolve: {
      location: function(LocationModel, $stateParams){
        return LocationModel.get({ id: $stateParams.id }).$promise.then(
          function success(location){ return location; },
          function error(err){ return error; }
        );
      }
    }
  });
})

.controller('LocationListCtrl', function LocationListCtrl( $scope, config, LocationModel, locations) {
  $scope.currentUser = config.currentUser;
  $scope.locations = locations;

  $scope.destroyLocation = function($index, location){
    LocationModel.delete({ id: location.id }).$promise.then(
      function success(model){
        console.log(model);
        $scope.locations.splice($index, 1);
       },
      function error(err) { console.error(err); }
    );
  };

})

.controller('LocationDetailCtrl', function LocationDetailCtrl( $state, $scope, config, LocationModel, location){
  $scope.currentUser = config.currentUser;
  $scope.location = location;
})

.controller('LocationCreateCtrl', function LocationCreateCtrl( $state, $scope, config, LocationModel){
  $scope.currentUser = config.currentUser;
  $scope.errors = [];
  $scope.newLocation = {};

  $scope.createLocation = function createLocation(){
      LocationModel.save($scope.newLocation,
        function success(location){
          $state.go('location.detail', {id: location.id });
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

.controller('LocationEditCtrl', function LocationEditCtrl($state, $scope, LocationModel, location){
  $cope.location = location;

  $scope.saveLocation = function(){
    location.$save();
  }
})
