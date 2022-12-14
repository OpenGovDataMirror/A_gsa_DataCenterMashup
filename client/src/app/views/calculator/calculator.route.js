(function() {

  angular
    .module('octoDatacenter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state({
      name: 'app.calculator',
      url: '/calculator',
      views: {
        '': {
          templateUrl: 'app/views/calculator/calculator.html',
          controller: 'CalculatorController'
        }
      }

    });
  }

})();
