(function() {

  angular.module('octoDatacenter')
    .controller('CalculatorController', /** @ngInject */ function ($scope) {
    	$scope.computedValues = {};
    	$scope.computeValues = function(){
    		$scope.computedValues.quantityServer15 = 2659;
    		$scope.computedValues.quantityStorage15 = 6102;
    		$scope.computedValues.quantityElectricity15 = 7759696;

    		$scope.computedValues.costServer15 = $scope.computedValues.unitCostServer15 * $scope.computedValues.quantityServer15;
    		$scope.computedValues.costStorage15 = $scope.computedValues.unitCostStorage15 * $scope.computedValues.quantityStorage15;
    		$scope.computedValues.costElectricity15 = $scope.computedValues.costElectricity15 * $scope.computedValues.quantityElectricity15;

    		$scope.computedValues.costServer16 = $scope.computedValues.unitCostServer16 * $scope.computedValues.quantityServer16;
    		$scope.computedValues.costStorage16 = $scope.computedValues.unitCostStorage16 * $scope.computedValues.quantityStorage16;
    		$scope.computedValues.costElectricity16 = $scope.computedValues.costElectricity16 * $scope.computedValues.quantityElectricity16;

    		$scope.computedValues.costServer17 = $scope.computedValues.unitCostServer17 * $scope.computedValues.quantityServer17;
    		$scope.computedValues.costStorage17 = $scope.computedValues.unitCostStorage17 * $scope.computedValues.quantityStorage17;
    		$scope.computedValues.costElectricity17 = $scope.computedValues.costElectricity17 * $scope.computedValues.quantityElectricity17;

    		$scope.computedValues.costServer18 = $scope.computedValues.unitCostServer18 * $scope.computedValues.quantityServer18;
    		$scope.computedValues.costStorage18 = $scope.computedValues.unitCostStorage18 * $scope.computedValues.quantityStorage18;
    		$scope.computedValues.costElectricity18 = $scope.computedValues.costElectricity18 * $scope.computedValues.quantityElectricity18;
    	}
    });

})();
