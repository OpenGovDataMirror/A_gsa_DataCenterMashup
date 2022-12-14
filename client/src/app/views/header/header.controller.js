(function() {

  angular
    .module('octoDatacenter')
    .controller('HeaderController', HeaderController);

  /** @ngInject */
  function HeaderController ($scope,$state,user) {
  	$scope.user = user.getUser();
  	if(!$scope.user.name) {
  		$state.go('app.login');
  	}
  }

  })();
