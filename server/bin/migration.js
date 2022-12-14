var csv = require('fast-csv');
var fs = require('fs');
var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.mysql;

var stream = fs.createReadStream("FDCCI-GAO-CFO-CPO-Q1-2014.csv");

var DataCenterInformation = app.models.DataCenterInformation;
var DataCenterInventory = app.models.DataCenterInventory;
var dataSet = [];
console.log("::::::::::Migration started:::::::::::::");
csv.fromStream(stream, {headers: [  
				'coreClassification',
				'recordValidity',
				'tcoClosingStage',
				'realPropertyDisposition',
				'totalFloorAreaEliminatedRepurposed',
				'totalDecommissionedPhysicalServers',
				'totalServersMovedToOtherDataCenter',
				'overallFTEReduction',
				'grossFloorArea',
				'floorAreaClassification',
				'annualCostPerSqFt',
				'tcoElectricityIncludedInCost',
				'tcoOwnershipType',
				'tcoProvidingServices',
				'percentageOfServicesPaidByOtherAgencies',
				'listOfAgenciesServiced',
				'providerName',
				'tcoDataCenterTier',
				'fte',
				'fteCost',
				'tcoElectricityIsMetered',
				'totalPowerCapacity',
				'averageElectricityUsage',
				'totalITPowerCapacity',
				'averageITElectricityUsage',
				'costperkWh',
				'wattsPerSqFt',
				'pue',
				'rackCount',
				'sqFtperRack',
				'totalIBMMainframes',
				'totalOtherMainframes',
				'totalWindowsServers',
				'totalUnixServers',
				'totalLinuxServers',
				'totalHPCClusterNodes',
				'otherServers',
				'totalVirtualHosts',
				'totalServerCount',
				'totalVirtualOS',
				'totalOSCount',
				'totalStorage',
				'usedStorage',
				'storageUtilization',
				'comments',
				'quarter',
				'year',
				'agencyDataCenterId',
				'createdBy'
              ]})
  .on("data", function(data){
      dataSet.push(data);
   })
   .on("end", function(){
      var count = dataSet.length;
      if(count == 0){
        dataSource.disconnect();
        console.log(":::::::::::::Migration is completed:::::::::");
      }else{
        dataSet.splice(0,1);
        count = dataSet.length;
      }

      dataSet.forEach(function(data) { 

      	DataCenterInventory.findOne({ where: {agencyDataCenterId:data.agencyDataCenterId} },function(err, record){
      		 if (err) {
            	return console.log(err);
          	}
          	data.dataCenterInventoryId = record.id;
	        DataCenterInformation.create(data, function(err, record) {
		        count--;
		        if (count === 0) {
		          dataSource.disconnect();
		          console.log(":::::::::::::Migration is completed:::::::::");
		        }
		        if (err) {
		        return console.log(err);
		        }
	        });

      	});

      });
   });