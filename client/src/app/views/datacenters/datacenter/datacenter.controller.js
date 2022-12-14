(function() {

  angular.module('octoDatacenter')
    .controller('DataCenterInvController', /** @ngInject */ function (Restangular, dataCenterInv, $state) {
		var vm = this;

		// function assignment
		vm.onSubmit = onSubmit;

		// function definition
		function onSubmit() {
			if(vm.model.id) {
				Restangular.one('DataCenterInventories', vm.model.id).customPUT(vm.model)
				.then(function() {
					$state.go('app.datacenters.list');
				}, function() {
					console.log("There was an error saving");
				});
			}
			else {
				Restangular.one('DataCenterInventories').customPOST(vm.model)
				.then(function() {
					$state.go('app.datacenters.list');
				}, function() {
					console.log("There was an error saving");
				});				
			}

		}

		vm.model = {};

		vm.statesList = [{"name":"Alabama","value":"AL"},{"name":"Alaska","value":"AK"},{"name":"American Samoa","value":"AS"},{"name":"Arizona","value":"AZ"},{"name":"Arkansas","value":"AR"},{"name":"California","value":"CA"},{"name":"Colorado","value":"CO"},{"name":"Connecticut","value":"CT"},{"name":"Delaware","value":"DE"},{"name":"District Of Columbia","value":"DC"},{"name":"Federated States Of Micronesia","value":"FM"},{"name":"Florida","value":"FL"},{"name":"Georgia","value":"GA"},{"name":"Guam","value":"GU"},{"name":"Hawaii","value":"HI"},{"name":"Idaho","value":"ID"},{"name":"Illinois","value":"IL"},{"name":"Indiana","value":"IN"},{"name":"Iowa","value":"IA"},{"name":"Kansas","value":"KS"},{"name":"Kentucky","value":"KY"},{"name":"Louisiana","value":"LA"},{"name":"Maine","value":"ME"},{"name":"Marshall Islands","value":"MH"},{"name":"Maryland","value":"MD"},{"name":"Massachusetts","value":"MA"},{"name":"Michigan","value":"MI"},{"name":"Minnesota","value":"MN"},{"name":"Mississippi","value":"MS"},{"name":"Missouri","value":"MO"},{"name":"Montana","value":"MT"},{"name":"Nebraska","value":"NE"},{"name":"Nevada","value":"NV"},{"name":"New Hampshire","value":"NH"},{"name":"New Jersey","value":"NJ"},{"name":"New Mexico","value":"NM"},{"name":"New York","value":"NY"},{"name":"North Carolina","value":"NC"},{"name":"North Dakota","value":"ND"},{"name":"Northern Mariana Islands","value":"MP"},{"name":"Ohio","value":"OH"},{"name":"Oklahoma","value":"OK"},{"name":"Oregon","value":"OR"},{"name":"Palau","value":"PW"},{"name":"Pennsylvania","value":"PA"},{"name":"Puerto Rico","value":"PR"},{"name":"Rhode Island","value":"RI"},{"name":"South Carolina","value":"SC"},{"name":"South Dakota","value":"SD"},{"name":"Tennessee","value":"TN"},{"name":"Texas","value":"TX"},{"name":"Utah","value":"UT"},{"name":"Vermont","value":"VT"},{"name":"Virgin Islands","value":"VI"},{"name":"Virginia","value":"VA"},{"name":"Washington","value":"WA"},{"name":"West Virginia","value":"WV"},{"name":"Wisconsin","value":"WI"},{"name":"Wyoming","value":"WY"}];

		// Use real data if the service provides it - otherwise show sample data to avoid data entry
		if(dataCenterInv) {
			vm.model = Restangular.stripRestangular(dataCenterInv)
		}
		else {
			vm.model = {"dataCenterInventoryId":"abc","coreClassification":"1","recordValidity":"1","tcoClosingTargetDate":"1","tcoClosingStage":"1","realPropertyDisposition":"1","realPropertyDispositionDate":"1","totalFloorAreaEliminatedRepurposed":"1","totalDecommissionedPhysicalServers":"1","totalServersMovedToOtherDataCenter":"1","overallFTEReduction":"1","grossFloorArea":"1","floorAreaClassification":"1","annualCostPerSqFt":"1","tcoElectricityIncludedInCost":"1","tcoOwnershipType":"1","tcoProvidingServices":"11","percentageOfServicesPaidByOtherAgencies":"1","listOfAgenciesServiced":"1","providerName":"1","tcoDataCenterTier":"1","fte":"1","fteCost":"1","tcoElectricityIsMetered":"1","totalPowerCapacity":"1","averageElectricityUsage":"1","totalITPowerCapacity":"1","averageITElectricityUsage":"1","costperkWh":"1","wattsPerSqFt":"1","pue":"1","rackCount":"1","sqFtperRack":"1","totalIBMMainframes":"1","totalOtherMainframes":"1","totalWindowsServers":"1","totalUnixServers":"1","totalLinuxServers":"1","totalHPCClusterNodes":"1","otherServers":"1","totalVirtualHosts":"1","totalServerCount":"1","totalVirtualOS":"1","totalOSCount":"1","totalStorage":"1","usedStorage":"1","storageUtilization":"1","comments":"1","quarter":"1","Year":"1","dataCenterId":"1","agencyDataCenterId":"1","legacyDataCenterId":"1","recordStatus":"1","agencyAbbreviation":"1","component":"1","officeName":"1","dataCenterName":"1","publishedName":"1","nonCoreSubCategory":"1","city":"1","state":"1","province":"1","zipCode":"1","country":"1","ownershipType":"1","colocationProvider":"1","colocationProviderType":"1","governmentWideProvider":"1","providingServices":"1","percentServicesPaidByOtherAgencies":"1","otherAgenciesServiced":"1","dataCenterTier":"1","totalCustomerFloorArea":"1","electricityIncludedInCost":"1","electricityIsMetered":"1","avgElectricityUsage":"1","avgITElectricityUsage":"1","costPerKWH":"1","closingStage":"1","closingFiscalYear":"1","closingQuarter":"1","totalFloorAreaEliminatedOrRepurposed":"1"};
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
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'dataCenterId',
						templateOptions: {
							label: 'Data Center ID',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'agencyDataCenterId',
						templateOptions: {
							label: 'Agency Data Center ID',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'legacyDataCenterId',
						templateOptions: {
							label: 'Legacy Data Center ID',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'recordStatus',
						templateOptions: {
							label: 'Record Status',
							className: 'form-control',
							options: [
								{name: 'Existing', value: 'existing'},
								{name: 'Not Existing', value: 'not existing'}
							]
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'recordValidity',
						templateOptions: {
							label: 'Record Validity',
							className: 'form-control',
							options: [
								{name: 'Added Facility', value: 'added facility'},
								{name: 'Valid Facility', value: 'valid facility'},
								{name: 'Invalid Facility', value: 'invalid vacility'}
							]
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'agencyAbbreviation',
						templateOptions: {
							label: 'Agency Abbreviation',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'component',
						templateOptions: {
							label: 'Component',
							className: 'form-control',
							options: [
								{name: 'CFO', value: 'cfo'},
								{name: 'CFO/CPO', value: 'cfo cpo'},
								{name: 'CPO', value: 'cpo'},
								{name: 'FAS', value: 'fas'},
								{name: 'OCIO', value: 'ocio'},
								{name: 'OGP', value: 'ogp'},
								{name: 'PBS', value: 'pbs'}
							]
						}
					},
					{
						className: 'col-sm-12',
						template: '<div class="box-header section-start section-divider"><h3 class="box-title">Data Center Information</h3><hr /></div>'
					},					
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'officeName',
						templateOptions: {
							label: 'Office Name',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'dataCenterName',
						templateOptions: {
							label: 'Data Center Name',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'publishedName',
						templateOptions: {
							label: 'Published Name',
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
						key: 'nonCoreSubCategory',
						templateOptions: {
							label: 'Non-core Sub-Category',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-12',
						template: '<div class="box-header section-start section-divider"><h3 class="box-title">Location Information</h3><hr /></div>'
					},					
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'city',
						templateOptions: {
							label: 'City',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'state',
						templateOptions: {
							label: 'State',
							className: 'form-control',
							options : vm.statesList 
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'province',
						templateOptions: {
							label: 'Province',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'zipCode',
						templateOptions: {
							label: 'Zip Code',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'country',
						templateOptions: {
							label: 'Country',
							className: 'form-control',
							options: [
								{name: 'United States', value: 'united states'},
								{name: 'International', value: 'international'}				
							]							
						}
					},
					{
						className: 'col-sm-12',
						template: '<div class="box-header section-start section-divider"><h3 class="box-title">Leasing Information</h3><hr /></div>'
					},					
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'ownershipType',
						templateOptions: {
							label: 'Ownership Type',
							className: 'form-control',
							options: [
								{name: 'Agency Owned', value: 'agency owned'},
								{name: 'Colocation', value: 'colocation'},
								{name: 'Outsourcing', value: 'outsourcing'}																		
							]							
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'colocationProvider',
						templateOptions: {
							label: 'Colocation Provider',
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
						key: 'colocationProviderType',
						templateOptions: {
							label: 'Colocation Provider Type',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'governmentWideProvider',
						templateOptions: {
							label: 'Government-Wide Provider',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'providingServices',
						templateOptions: {
							label: 'Providing Services',
							className: 'form-control',
							options: [
								{name: 'Yes', value: 'yes'},
								{name: 'No', value: 'no'}
							]
						}
					},
					{
						className: 'col-sm-12',
						template: '<div class="box-header section-start section-divider"><h3 class="box-title">Cost Information</h3><hr /></div>'
					},					
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'percentServicesPaidByOtherAgencies',
						templateOptions: {
							label: 'Percent Services Paid by Other Agencies',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'otherAgenciesServiced',
						templateOptions: {
							label: 'Other Agencies Serviced',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'dataCenterTier',
						templateOptions: {
							label: 'Data Center Tier',
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
						key: 'grossFloorArea',
						templateOptions: {
							label: 'Gross Floor Area',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalCustomerFloorArea',
						templateOptions: {
							label: 'Total Customer Floor Area',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'annualCostPerSqFt',
						templateOptions: {
							label: 'Annual Cost per Sq Ft',
							className: 'form-control'
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
						key: 'electricityIncludedInCost',
						templateOptions: {
							label: 'Electricity Included in Cost',
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
						key: 'electricityIsMetered',
						templateOptions: {
							label: 'Electricity is Metered',
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
							label: 'Total Power Capacity',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalITPowerCapacity',
						templateOptions: {
							label: 'Total IT Power Capacity',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'avgElectricityUsage',
						templateOptions: {
							label: 'Avg Electricity Usage',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'avgITElectricityUsage',
						templateOptions: {
							label: 'Avg IT Electricity Usage',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'costPerKWH',
						templateOptions: {
							label: 'Cost per KWH',
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
						className: 'col-sm-12',
						template: '<div class="box-header section-start section-divider"><h3 class="box-title">Server Information</h3><hr /></div>'
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
						key: 'totalVirtualOS',
						templateOptions: {
							label: 'Total Virtual OS',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalStorage',
						templateOptions: {
							label: 'Total Storage',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'usedStorage',
						templateOptions: {
							label: 'Used Storage',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'closingStage',
						templateOptions: {
							label: 'Closing Stage',
							className: 'form-control',
							options: [
								{name: 'Application Mapping', value: 'application mapping'},
								{name: 'Closed', value: 'closed'},
								{name: 'Considering', value: 'considering'},
								{name: 'Equipment Removal', value: 'equipment removal'},
								{name: 'Migration Planning', value: 'migration planning'},
								{name: 'Not Closing', value: 'not closing'}							
							]
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'closingFiscalYear',
						templateOptions: {
							label: 'Closing Fiscal Year',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'closingQuarter',
						templateOptions: {
							label: 'Closing Quarter',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'realPropertyDisposition',
						templateOptions: {
							label: 'Real Property Disposition',
							className: 'form-control',
							options: [
								{name: 'Dispose at Close', value: 'dispose at close'},
								{name: 'Dispose at Later Date', value: 'dispose at later date'},
								{name: 'Repurpose', value: 'repurpose'},		
								{name: 'Blank', value: 'blank'}											
							]							
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
						key: 'totalFloorAreaEliminatedOrRepurposed',
						templateOptions: {
							label: 'Total Floor Area Eliminated or Repurposed',
							className: 'form-control'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'totalDecommissionedPhysicalServers',
						templateOptions: {
							label: 'Total Decommissioned Physical Servers',
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
						className: 'col-sm-4',
						type: 'input',
						key: 'overallFTEReduction',
						templateOptions: {
							label: 'Overall FTE Reduction',
							className: 'form-control'
						}
					}																																																																																											
		    ]
		  }
		];

		vm.originalFields = angular.copy(vm.fields);


  })

})();
