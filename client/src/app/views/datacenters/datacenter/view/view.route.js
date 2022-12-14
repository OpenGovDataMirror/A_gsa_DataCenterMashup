(function() {

  angular
    .module('octoDatacenter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider    
    .state({
      name: 'app.datacenters.datacenter.view',
      url: '/:dataCenterId',
      views: {
        '': {
          templateUrl: 'app/views/datacenters/datacenter/view/view.html',
          controller: 'DataCenterViewController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        dataCenter: function($stateParams, Restangular) {
          return Restangular.one('DataCenterInventories',$stateParams.dataCenterId).get();
        },      	
        dataCenterInformations: function($stateParams, Restangular) {
          return Restangular.one('DataCenterInventories',$stateParams.dataCenterId).one('dataCenterInformations').get();
        }
      }
    });
  }    
})();
