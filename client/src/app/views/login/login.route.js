(function() {

  angular
    .module('octoDatacenter')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider.state({
      name: 'app.login',
      url: '/login',
      views: {
        '': {
          templateUrl: 'app/views/login/login.html',
          controller: 'LoginController'
        },
        'header@': '',
        'footer@': ''
      }
    });
  }

})();
