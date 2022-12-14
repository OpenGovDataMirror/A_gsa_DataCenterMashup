(function() {

  angular.module('octoDatacenter')
    .controller('BodyController', /** @ngInject */ function ($scope, $state) {
			$scope.$state = $state;
		})
		.controller('MainController', /** @ngInject */ function ($scope, user, $filter, quarterChartData, serverChartData, storageChartData, allQuarterChartData, fteChartData, electricityChartData, allInfoData) {
		  
		  $scope.allInfoData = allInfoData;
	  
			$scope.user = user.getUser();

			/* Main Cost Chart */

		  $scope.mainChart = {};
		  $scope.mainChart.labels = quarterChartData.result.quarters;
		  $scope.mainChart.data = [quarterChartData.result.totalCosts];

			$scope.mainChart.colors = [{
				fillColor: 'rgba(60,141,188,0.7)',
				strokeColor: 'rgba(60,141,188,0.9)',
				highlightFill: 'rgba(60,141,188,0.9)',
				highlightStroke: 'rgba(60,141,188,0.9)'
			}];

		  $scope.mainChart.options = {
		  	scaleLabel: function (valuePayload) {
			    return $filter('currency')(valuePayload.value, '$', 0);
				},
				tooltipTemplate: function (valuePayload) {
			    return valuePayload.label + " - " + $filter('currency')(valuePayload.value, '$', 0);
				}
		  }

		  /* Server Chart */

		  $scope.serverChart = {};
		  $scope.serverChart.labels = serverChartData.results.quarters;
		  $scope.serverChart.data = serverChartData.results.counts;
		  $scope.serverChart.series = serverChartData.results.labels;
			$scope.serverChart.colors = ['#f56954','#00a65a','#f39c12','#00c0ef'];


			/* Storage Chart */

		  $scope.storageChart = {};
		  $scope.storageChart.labels = storageChartData.results.quarters;
		  $scope.storageChart.data = storageChartData.results.counts;
		  $scope.storageChart.series = storageChartData.results.labels;
			$scope.storageChart.colors = ['#f56954','#00a65a'];


			/* FTE Chart */

		  $scope.fteChart = {};
		  $scope.fteChart.labels = fteChartData.results.quarters;
		  $scope.fteChart.data = fteChartData.results.fteCost;
			$scope.fteChart.colors = ['#f56954','#00a65a'];
		  $scope.fteChart.options = {
				tooltipTemplate: function (valuePayload) {
			    return valuePayload.label + " - " + $filter('currency')(valuePayload.value, '$', 0);
				}
		  }

			/* Energy Chart */

		  $scope.energyChart = {};
		  $scope.energyChart.labels = electricityChartData.results.quarters;
		  $scope.energyChart.data = electricityChartData.results.electricityUsage;
			$scope.energyChart.colors = ['#f56954','#00a65a'];
		  $scope.energyChart.options = {
				tooltipTemplate: function (valuePayload) {
			    return valuePayload.label + " - " + $filter('currency')(valuePayload.value, '$', 0);
				}
		  }

			/* Top 5 Tables */

			$scope.allQuarterlyCostData = allQuarterChartData.result;
			$scope.allQuarterlyElectricData = allQuarterChartData.result;

    });

})();
