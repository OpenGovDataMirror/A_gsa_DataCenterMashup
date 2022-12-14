(function() {

  angular
    .module('octoDatacenter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state({
      name: 'app.datacenters',
      url: '/datacenters',
      abstract: true,
      views: {
        '': {
          template: '<div ui-view></div>'
        }
      }

    });
  }

})();
