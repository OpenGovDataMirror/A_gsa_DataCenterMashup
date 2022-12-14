(function() {

  angular
    .module('octoDatacenter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider    
    .state({
      name: 'app.datacenters.list',
      url: '',
      views: {
        '': {
          templateUrl: 'app/views/datacenters/list/list.html',
          controller: 'DataCenterListController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        dataCenters: function($stateParams, Restangular) {
          return Restangular.one('DataCenterInventories').get();
        }
      }
    });
  }    
})();
