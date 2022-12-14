(function() {

  angular
    .module('octoDatacenter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state({
      name: 'app.main',
      url: '/',
      views: {
        '': {
          templateUrl: 'app/views/main/main.html',
          controller: 'MainController'
        }
      },
      resolve: {
        allInfoData: function($stateParams, Restangular) {
          return Restangular.one('dataCenterInformations').get();
        },
        quarterChartData: function($stateParams, Restangular) {
          return Restangular.one('analytics').one('getTotalCost').get({'quarterYear':'3:2015'});
        },
        serverChartData: function($stateParams, Restangular) {
          return Restangular.one('analytics').one('getQuarterlyServerCounts').get();
        },
        storageChartData: function($stateParams, Restangular) {
          return Restangular.one('analytics').one('getQuarterlyStorageCounts').get();
        },
        allQuarterChartData: function($stateParams, Restangular) {
          return Restangular.one('analytics').one('getAllDataCenterCostAndElectricityUsageInfo').get({'quarterYear':'3:2015'});
        },
        fteChartData: function($stateParams, Restangular) {
          return Restangular.one('analytics').one('getQuarterlyFTECost').get();
        },          
        electricityChartData: function($stateParams, Restangular) {
          return Restangular.one('analytics').one('getQuarterlyElectricityUsage').get();
        },         
      }
    });
  }

})();
