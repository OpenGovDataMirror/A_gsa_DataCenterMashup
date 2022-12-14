(function() {

  angular
    .module('octoDatacenter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
    .state({
      name: 'app.datacenters.datacenter',
      url: '/datacenter',
      abstract: true,
      views: {
        '': {
          template: '<div ui-view></div>',
        }
      }     
    })
    .state({
      name: 'app.datacenters.datacenter.create',
      url: '',
      views: {
        '': {
          templateUrl: 'app/views/datacenters/datacenter/datacenter.html',
          controller: 'DataCenterInvController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        dataCenterInv: function() {
          return null;
        }
      }      
    })
    .state({
      name: 'app.datacenters.datacenter.edit',
      url: '/:dataCenterId/edit',
      views: {
        '': {
          templateUrl: 'app/views/datacenters/datacenter/datacenter.html',
          controller: 'DataCenterInvController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        dataCenterInv: function($stateParams, Restangular) {
          return Restangular.one('DataCenterInventories',$stateParams.dataCenterId).get();
        }
      }
    })
    ;
  }

})();
