(function() {

  angular.module('octoDatacenter')
    .controller('DataCenterViewController', /** @ngInject */ function (Restangular, dataCenter, dataCenterInformations) {
			var vm = this;

			vm.dataCenter = dataCenter;
			vm.dataCenterInformations = dataCenterInformations;

			

  	})

})();
