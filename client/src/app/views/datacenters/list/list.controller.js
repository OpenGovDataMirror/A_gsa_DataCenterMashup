(function() {

  angular.module('octoDatacenter')
    .controller('DataCenterListController', /** @ngInject */ function (Restangular, dataCenters, toastr) {
			var vm = this;

			vm.dataCenters = dataCenters;

			
			vm.deleteDataCenter = function(row) 
			{
				Restangular.one('DataCenterInventories', row.id).remove()
				.then(function() {
					
					Restangular.one('DataCenterInventories').get()
					.then(function(result) {
						vm.dataCenters	= result;
						toastr.success("Has been deleted.","Data Center: " +row.dataCenterName);
					});
					
				}, function() {
						// Custom Error Handling					
				});
			}
  	})

})();
