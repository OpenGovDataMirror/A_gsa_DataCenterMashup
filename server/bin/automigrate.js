var csv = require('fast-csv');
var fs = require('fs');
var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.mysql;

var stream = fs.createReadStream("FDCCI DataPoint-inventory.csv");

var DataCenterInventory = app.models.DataCenterInventory;
var dataSet = [];
console.log("::::::::::Migration started:::::::::::::");
csv.fromStream(stream, {headers: [  
            'dataCenterId',
            'agencyDataCenterId',
            'legacyDataCenterId',
            'recordStatus',
            'recordValidity',
            'agencyAbbreviation',
            'component',
            'officeName',
            'dataCenterName',
            'publishedName',
            'coreClassification',
            'nonCoreSubCategory',
            'city',
            'state',
            'province',
            'zipCode',
            'country',
            'ownershipType',
            'colocationProvider',
            'colocationProviderType',
            'governmentWideProvider',
            'providingServices',
            'percentServicesPaidByOtherAgencies',
            'otherAgenciesServiced',
            'dataCenterTier',
            'grossFloorArea',
            'totalCustomerFloorArea',
            'annualCostPerSqFt',
            'fte',
            'fteCost',
            'electricityIncludedInCost',
            'electricityIsMetered',
            'totalPowerCapacity',
            'totalITPowerCapacity',
            'avgElectricityUsage',
            'avgITElectricityUsage',
            'costPerKWH',
            'rackCount',
            'totalIBMMainframes',
            'totalOtherMainframes',
            'totalWindowsServers',
            'totalUnixServers',
            'totalLinuxServers',
            'totalHPCClusterNodes',
            'otherServers',
            'totalVirtualHosts',
            'totalVirtualOS',
            'totalStorage',
            'usedStorage',
            'closingStage',
            'closingFiscalYear',
            'closingQuarter',
            'realPropertyDisposition',
            'realPropertyDispositionDate',
            'totalFloorAreaEliminatedOrRepurposed',
            'totalDecommissionedPhysicalServers',
            'totalServersMovedToOtherDataCenter',
            'overallFTEReduction'
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
      data.createdBy = "Vernon Samuel ";        
        DataCenterInventory.create(data, function(err, record) {
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