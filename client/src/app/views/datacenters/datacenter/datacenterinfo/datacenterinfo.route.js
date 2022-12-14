(function() {

  angular
    .module('octoDatacenter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
    .state({
      name: 'app.datacenters.datacenter.datacenterinfo',
      url: '/:dataCenterId/quarterly',
      abstract: true,
      views: {
        '': {
          template: '<div ui-view></div>',
        }
      },
      resolve: {
        dataCenter: function($stateParams, Restangular) {
          return Restangular.one('DataCenterInventories',$stateParams.dataCenterId).get();
        }
      }

    })
    .state({
      name: 'app.datacenters.datacenter.datacenterinfo.create',
      url: '',
      views: {
        '': {
          templateUrl: 'app/views/datacenters/datacenter/datacenterinfo/datacenterinfo.html',
          controller: 'DataCenterInfoController',
          controllerAs: 'vm'
        }
      },
      resolve: {
        dataCenterInformation: function() {
          return null;
        }
      }      
    })
    .state({
      name: 'app.datacenters.datacenter.datacenterinfo.edit',
      url: '/:dataCenterInfoId',
      views: {
        '': {
          templateUrl: 'app/views/datacenters/datacenter/datacenterinfo/datacenterinfo.html',
          controller: 'DataCenterInfoController',
          controllerAs: 'vm'
        }
      },
      resolve: {      
        dataCenterInformation: function($stateParams, Restangular) {
          return Restangular.one('DataCenterInformations',$stateParams.dataCenterInfoId).get();
        }
      }
    })
    ;
  }

})();
