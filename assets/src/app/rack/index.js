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
        templateUrl: 'src/app/rack/index.tpl.html'
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
      tags: function(TagModel){
        return TagModel.query().$promise.then(
          function success(tags){ return tags; },
          function error(error){ return error; }
        );
      }
})
.controller('RackListCtrl', function RackListCtrl($state, $scope, config, $log, RackModel, racks) {
  $scope.currentUser = config.currentUser;
  $scope.racks = racks;
  console.debug($state);

  $scope.destroyRack = function($index, rack){
    RackModel.delete({ id: rack.id }).$promise.then(
      function success(model){
        console.log(model);
        $scope.racks.splice($index, 1);
       },
      function error(err) { console.error(err); }
    );
  };

})
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
