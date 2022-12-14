(function() {

  angular.module('octoDatacenter')
    .controller('DataCenterInfoController', /** @ngInject */ function (Restangular, dataCenterInformation, $state, dataCenter) {
		var vm = this;

		// function assignment
		vm.onSubmit = onSubmit;

		// function definition
		function onSubmit() {
			if(vm.model.id) {
				vm.model.dataCenterInventoryId = dataCenter.id;
				Restangular.one('DataCenterInformations', vm.model.id).customPUT(vm.model)
				.then(function() {
					$state.go('app.datacenters.datacenter.view', {'dataCenterId':dataCenter.id});
				}, function() {
					console.log("There was an error saving");
				});
			}
			else {
				vm.model.dataCenterInventoryId = dataCenter.id;
				Restangular.one('DataCenterInformations').customPOST(vm.model)
				.then(function() {
					$state.go('app.datacenters.datacenter.view', {'dataCenterId':dataCenter.id});
				}, function() {
					console.log("There was an error saving");
				});				
			}

		}

		vm.model = {};

		// Use real data if the service provides it - otherwise show sample data to avoid data entry
		if(dataCenterInformation) {
			vm.model = Restangular.stripRestangular(dataCenterInformation)
		}
		else {
			//vm.model = {"dataCenterInventoryId":dataCenter.id,"coreClassification":"1","recordValidity":"1","tcoClosingTargetDate":"1","tcoClosingStage":"1","realPropertyDisposition":"1","realPropertyDispositionDate":"1","totalFloorAreaEliminatedRepurposed":"1","totalDecommissionedPhysicalServers":"1","totalServersMovedToOtherDataCenter":"1","overallFTEReduction":"1","grossFloorArea":"1","floorAreaClassification":"1","annualCostPerSqFt":"1","tcoElectricityIncludedInCost":"1","tcoOwnershipType":"1","tcoProvidingServices":"11","percentageOfServicesPaidByOtherAgencies":"1","listOfAgenciesServiced":"1","providerName":"1","tcoDataCenterTier":"1","fte":"1","fteCost":"1","tcoElectricityIsMetered":"1","totalPowerCapacity":"1","averageElectricityUsage":"1","totalITPowerCapacity":"1","averageITElectricityUsage":"1","costperkWh":"1","wattsPerSqFt":"1","pue":"1","rackCount":"1","sqFtperRack":"1","totalIBMMainframes":"1","totalOtherMainframes":"1","totalWindowsServers":"11","totalUnixServers":"1","totalLinuxServers":"1","totalHPCClusterNodes":"1","otherServers":"1","totalVirtualHosts":"1","totalServerCount":"1","totalVirtualOS":"1","totalOSCount":"1","totalStorage":"1","usedStorage":"1","storageUtilization":"1","comments":"1","quarter":"1","year":"1"};
		}


		vm.fields = [
		  {
		    className: 'row',
		    fieldGroup: [
				  /* Insert this snippet to separate sections */
					
					/*

					{
						className: 'col-sm-12',
						template: '<hr /><div class="box-header"><h3 class="box-title">Servers</h3></div>'
					},

				  */	
					{
						className: 'col-sm-12',
						template: '<div class="box-header section-start section-divider"><h3 class="box-title">Basic Information</h3><hr /></div>'
					},
					/*
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'dataCenterInventoryId',
						templateOptions: {
							label: 'Data Center ID',
							className: 'form-control'
						}
					},*/
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'quarter',
						templateOptions: {
							label: 'Quarter',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'year',
						templateOptions: {
							label: 'Year',
							className: 'form-control'
						}
					},				
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'coreClassification',
						templateOptions: {
							label: 'Core Classification',
							className: 'form-control',
							options: [
								{name: 'Core', value: 'core'},
								{name: 'Non-Core', value: 'non-core'}
							]							
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'recordValidity',
						templateOptions: {
							label: 'Record Validity',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'tcoClosingTargetDate',
						templateOptions: {
							label: 'TCO Closing Target Date',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'tcoClosingStage',
						templateOptions: {
							label: 'TCO Closing Stage',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'realPropertyDisposition',
						templateOptions: {
							label: 'Real Property Disposition',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'realPropertyDispositionDate',
						templateOptions: {
							label: 'Real Property Disposition Date',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalFloorAreaEliminatedRepurposed',
						templateOptions: {
							label: 'Total Floor Area Eliminated/Repurposed',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalDecommissionedPhysicalServers',
						templateOptions: {
							label: 'Total De-commissioned Physical Servers',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalServersMovedToOtherDataCenter',
						templateOptions: {
							label: 'Total Servers Moved to Other Data Center',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-12',
						template: '<div class="box-header section-divider"><h3 class="box-title">Running Costs</h3><hr /></div>'
					},					
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'overallFTEReduction',
						templateOptions: {
							label: 'Overall FTE Reduction',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'grossFloorArea',
						templateOptions: {
							label: 'Gross Floor Area (SqFt)',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'floorAreaClassification',
						templateOptions: {
							label: 'Floor Area Classification',
							className: 'form-control',
							options: [
								{name: '<100', value: 'less than 100'},
								{name: '<250', value: 'less than 250'},
								{name: '<500', value: 'less than 500'},
								{name: '<1000', value: 'less than 1000'},
								{name: '<2500', value: 'less than 2500'},
								{name: '<5000', value: 'less than 5000'},
								{name: '>5000', value: 'greater than 5000'}
							]							
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'annualCostPerSqFt',
						templateOptions: {
							label: 'Annual Cost per SqFt',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'tcoElectricityIncludedInCost',
						templateOptions: {
							label: 'TCO Electricity Included In Cost',
							className: 'form-control',
							options: [
								{name: 'Yes', value: 'yes'},
								{name: 'No', value: 'no'}																		
							]							
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'tcoOwnershipType',
						templateOptions: {
							label: 'TCO Ownership Type',
							className: 'form-control',
							options: [
								{name: 'GSA Owned', value: 'gsa owned'},
								{name: 'Lease and Retrofit', value: 'lease and retrofit'},
								{name: 'Outsourcing to Other Agency', value: 'outsourcing to other agency'},
								{name: 'Non Government Collocation', value: 'non government collocation'},
								{name: 'Outsourcing to Contractor', value: 'outsourcing to contractor'},
								{name: 'Government Collocation', value: 'government collocation'}								
							]						
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'tcoProvidingServices',
						templateOptions: {
							label: 'TCO Providing Services',
							className: 'form-control',
							options: [
								{name: 'Yes', value: 'yes'},
								{name: 'No', value: 'no'}																		
							]							
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'percentageOfServicesPaidByOtherAgencies',
						templateOptions: {
							label: '% of Services paid by Other Agencies',
							className: 'form-control'
						}
					},																														
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'listOfAgenciesServiced',
						templateOptions: {
							label: 'List of Agencies Serviced',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'providerName',
						templateOptions: {
							label: 'Provider Name (Contractor)',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'tcoDataCenterTier',
						templateOptions: {
							label: 'TCO Data Center Tier',
							className: 'form-control',
							options: [
								{name: 'Tier I', value: 'tier 1'},
								{name: 'Tier II', value: 'tier 2'},
								{name: 'Tier III', value: 'tier 3'},
								{name: 'Tier IV', value: 'tier 4'},
								{name: 'Server Room/Closet', value: 'server room closet'}																								
							]							
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'fte',
						templateOptions: {
							label: 'FTE',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'fteCost',
						templateOptions: {
							label: 'FTE Cost',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'tcoElectricityIsMetered',
						templateOptions: {
							label: 'TCO Electricity Is Metered',
							className: 'form-control',
							options: [
								{name: 'Yes', value: 'yes'},
								{name: 'No', value: 'no'}																		
							]							
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalPowerCapacity',
						templateOptions: {
							label: 'Total Power Capacity (kW)',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'averageElectricityUsage',
						templateOptions: {
							label: 'Average Electricity Usage (kWh)',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalITPowerCapacity',
						templateOptions: {
							label: 'Total I.T. Power Capacity (kW)',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'averageITElectricityUsage',
						templateOptions: {
							label: 'Average I.T. Electricity Usage (kWh)',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'costperkWh',
						templateOptions: {
							label: 'Cost per kWh',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'wattsPerSqFt',
						templateOptions: {
							label: 'Watts Per Sq.Ft.*',
							className: 'form-control'
						}
					},					
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'pue',
						templateOptions: {
							label: 'PUE',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'rackCount',
						templateOptions: {
							label: 'Rack Count',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'sqFtperRack',
						templateOptions: {
							label: 'Sq. Ft. per Rack*',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-12',
						template: '<div class="box-header section-divider"><h3 class="box-title">Servers</h3><hr /></div>'
					},						
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalIBMMainframes',
						templateOptions: {
							label: 'Total IBM Mainframes',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalOtherMainframes',
						templateOptions: {
							label: 'Total Other Mainframes',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalWindowsServers',
						templateOptions: {
							label: 'Total Windows Servers',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalUnixServers',
						templateOptions: {
							label: 'Total Unix Servers',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalLinuxServers',
						templateOptions: {
							label: 'Total Linux Servers',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalHPCClusterNodes',
						templateOptions: {
							label: 'Total HPC Cluster Nodes',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'otherServers',
						templateOptions: {
							label: 'Other Servers',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalVirtualHosts',
						templateOptions: {
							label: 'Total Virtual Hosts',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalServerCount',
						templateOptions: {
							label: 'Total Server Count',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalVirtualOS',
						templateOptions: {
							label: 'Total Virtual OS',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalOSCount',
						templateOptions: {
							label: 'Total OS Count',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalStorage',
						templateOptions: {
							label: 'Total Storage (TB)',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'usedStorage',
						templateOptions: {
							label: 'Used Storage (TB)',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'storageUtilization',
						templateOptions: {
							label: 'Storage Utilization',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'comments',
						templateOptions: {
							label: 'Comments',
							className: 'form-control'
						}
					}									
		    ]
		  }
		];

		vm.originalFields = angular.copy(vm.fields);


  })

})();
