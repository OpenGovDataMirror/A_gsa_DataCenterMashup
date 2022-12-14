var mysql      = require('mysql');
var async      = require('async');
var quartersRef = ['XXX','Q1','Q2','Q3','Q4'];
var datasources = require('../../server/datasources.json');
module.exports = function(Analytics) {

	/*
		This method parses the quarterYear input and return quarter object that 
		contains inValid, quarter and year 
	*/
	parseQuarterInput = function(quarterYear){
		var quarterObj;
		if(quarterYear){
			quarterObj = {};
			quarterObj.isValid = true;			
			var arr = quarterYear.split(':');
			if(arr.length != 2){
				quarterObj.isValid = false;		
			}
			quarterObj.quarter = parseInt(arr[0]);
			if(quarterObj.quarter <1 || quarterObj.quarter>4){
				quarterObj.isValid = false;
			}
			quarterObj.year = parseInt(arr[1]);
			if(isNaN(quarterObj.quarter) 
					|| isNaN(quarterObj.year)){
				quarterObj.isValid = false;
			}
		}
		return quarterObj;
	}

	/*
		Implementation of getQuarterlyDifferences REST API endpoint.
	*/
	Analytics.getQuarterlyDifferences = function(quarterYear1, quarterYear2, dataCenterId, cb) {
		var quarterObj1;
		if(quarterYear1){
			quarterObj1 = parseQuarterInput(quarterYear1);
			if(!quarterObj1.isValid){
				cb(new Error("Invalid input for: quarterYear1") , null);			
			}		
		}
		var quarterObj2;
		if(quarterYear2){
			quarterObj2 = parseQuarterInput(quarterYear2);
			if(!quarterObj2.isValid){
				cb(new Error("Invalid input for: quarterYear1") , null);			
			}		
		}
		async.parallel(
		{
			one: function(callback){
				calculateQuarterlyTotals(quarterObj1, dataCenterId, function(err, data){
					if(err){
						callback(err, null);
					}
					if(!data || data.length == 0){
						var errorMessage = "No data found for the given quarter - " 
							+ quarterObj1.quarter 
							+ ":"
							+quarterObj1.year;
						if(dataCenterId){
							errorMessage = errorMessage + " and data center id -  " + dataCenterId;
						}
						callback(new Error(errorMessage), null);
					}else{
						callback(null, data);	
					}						
				});
			},
			two: function(callback){
				calculateQuarterlyTotals(quarterObj2, dataCenterId, function(err, data){
					if(err){
						callback(err, null);
					}
					if(!data || data.length == 0){
						var errorMessage = "No data found for the given quarter - " 
							+ quarterObj1.quarter 
							+ ":"
							+quarterObj1.year;
						if(dataCenterId){
							errorMessage = errorMessage + " and data center id -  " + dataCenterId;
						}
						callback(new Error(errorMessage) , null);
					}else{
						callback(null, data);	
					}		
				});
			}

		}, function(err, results){
			if(err){
				cb(err, null);
			}else{
				var quarter1Data = results.one[0];
				var quarter2Data = results.two[0];
				var difference = {};
				difference.quarter1 = quartersRef[quarter1Data.quarter] + " "+ quarter1Data.year;
				difference.quarter2 = quartersRef[quarter2Data.quarter] + " "+ quarter2Data.year;				
				difference.fteCost = quarter2Data.fteCost - quarter1Data.fteCost;
				difference.averageElectricityUsage = quarter2Data.averageElectricityUsage - quarter1Data.averageElectricityUsage;				
				difference.averageITElectricityUsage = quarter2Data.averageITElectricityUsage - quarter1Data.averageITElectricityUsage;
				difference.totalStorage = quarter2Data.totalStorage - quarter1Data.totalStorage;
				difference.usedStorage = quarter2Data.usedStorage - quarter1Data.usedStorage;
				difference.totalVirtualHosts = quarter2Data.totalVirtualHosts - quarter1Data.totalVirtualHosts;
				difference.totalVirtualOS = quarter2Data.totalVirtualOS - quarter1Data.totalVirtualOS;				
				difference.storageUtilization = quarter2Data.storageUtilization - quarter1Data.storageUtilization;
				difference.totalOSCount = quarter2Data.totalOSCount - quarter1Data.totalOSCount;
				difference.totalWindowsServers = quarter2Data.totalWindowsServers - quarter1Data.totalWindowsServers;
				difference.totalUnixServers = quarter2Data.totalUnixServers - quarter1Data.totalUnixServers;
				difference.totalLinuxServers = quarter2Data.totalLinuxServers - quarter1Data.totalLinuxServers;
				difference.totalHPCClusterNodes = quarter2Data.totalHPCClusterNodes - quarter1Data.totalHPCClusterNodes;
				difference.otherServers = quarter2Data.otherServers - quarter1Data.otherServers;
				difference.totalDecommissionedPhysicalServers = quarter2Data.totalDecommissionedPhysicalServers - quarter1Data.totalDecommissionedPhysicalServers;
				cb(err, difference);
			}
		}
		);

	};

	getConnection = function(){
		var connection = mysql.createConnection({
		  host     : datasources.mysql.host,
		  port     : datasources.mysql.port,
		  user     : datasources.mysql.username,
		  password : datasources.mysql.password,		 
		  database : datasources.mysql.database
		});
		return connection;
	}

	calculateQuarterlyTotals = function(quarterObj, dataCenterId, cb){
		var connection = getConnection();
		connection.connect();
		var selectClause = "select quarter quarter, year year, sum(fteCost) fteCost, sum(averageElectricityUsage) averageElectricityUsage, "
							+"sum(averageITElectricityUsage) averageITElectricityUsage, sum(totalStorage) totalStorage, sum(usedStorage) usedStorage,"
							+" sum(totalVirtualOS) totalVirtualOS, sum(totalOSCount) totalOSCount,"
							+" sum(totalVirtualHosts) totalVirtualHosts, sum(storageUtilization) storageUtilization, "
							+" sum(totalWindowsServers) totalWindowsServers, sum(totalUnixServers) totalUnixServers,"
							+" sum(totalLinuxServers) totalLinuxServers, sum(totalHPCClusterNodes) totalHPCClusterNodes,"
							+" sum(otherServers) otherServers, sum(totalDecommissionedPhysicalServers) totalDecommissionedPhysicalServers";
		var fromClause = " from datacenterinformation ";
		var groupByClause = " group by quarter, year ";	
		var orderByClause = " order by year desc, quarter desc ";		
		var limitClause = " LIMIT 4 ";
		var whereClause = "";

		if(quarterObj && quarterObj.quarter){
			if(whereClause.length == 0){
				whereClause = whereClause + " where ";
			}else{
				whereClause = whereClause + " and  ";
			}
			whereClause = whereClause + " quarter = " + quarterObj.quarter;
		}

		if(quarterObj && quarterObj.year){
			if(whereClause.length == 0){
				whereClause = whereClause + " where ";
			}else{
				whereClause = whereClause + " and  ";
			}
			whereClause = whereClause + " year = " + quarterObj.year;
		}

		if(dataCenterId){
			if(whereClause.length == 0){
				whereClause = whereClause + " where ";
			}else{
				whereClause = whereClause + " and  ";
			}
			whereClause = whereClause + " dataCenterInventoryId = " + dataCenterId;
		}
		var query = selectClause + fromClause + whereClause + groupByClause + orderByClause + limitClause;
		console.log("Query ::: "+ query);
		connection.query(query, function(err, rows, fields) {
			connection.end();
		  	if(err){
				cb(err, null);
			}			
			cb(null, rows);	 
		  	
		});
	}

	/**
		Implementation of getQuarterlyServerCounts REST API endpoint.
	*/
	Analytics.getQuarterlyServerCounts = function(quarterYear, dataCenterId, cb) {	
		var quarterObj;
		if(quarterYear){
			quarterObj = parseQuarterInput(quarterYear);
			if(!quarterObj.isValid){
				cb(new Error("Invalid input for: quarterYear") , null);			
			}		
		}
		calculateQuarterlyTotals(quarterObj, dataCenterId, function(err, data){
			if(err){
				cb(err, null);
			}
			var result = {};
			var quarters = [];
			var labels = [	"Windows Servers",
							"Unix Servers",
							"Linux Servers",
							"Other Servers"];
			result.quarters = quarters;
			result.labels = labels;
			result.counts = [];
			var windowsServers = [];
			var unixServers = [];
			var linuxServers = [];
			var otherServers = [];
			result.counts.push(windowsServers);
			result.counts.push(unixServers);
			result.counts.push(linuxServers);
			result.counts.push(otherServers);
			if(data && data.length >0){
				for(var i in data){
					var row = data[i];
					var counts = [];
					quarters.push(quartersRef[row.quarter] + " "+ row.year);
					windowsServers.push(row.totalWindowsServers);
					unixServers.push(row.totalUnixServers);
					linuxServers.push(row.totalLinuxServers);
					otherServers.push(row.otherServers);
				}
			}
			result.quarters.reverse();  
			result.counts[0].reverse();
			result.counts[1].reverse();
			result.counts[2].reverse();
			result.counts[3].reverse();
			cb(null, result);		
		});
	};

	/**
		Implementation of getQuarterlyStorageCounts REST API endpoint.
	*/
	Analytics.getQuarterlyStorageCounts = function(quarterYear, dataCenterId, cb) {	
		var quarterObj;
		if(quarterYear){
			quarterObj = parseQuarterInput(quarterYear);
			if(!quarterObj.isValid){
				cb(new Error("Invalid input for: quarterYear") , null);			
			}		
		}
		calculateQuarterlyTotals(quarterObj, dataCenterId, function(err, data){
			if(err){
				cb(err, null);
			}
			var result = {};
			var quarters = [];
			var labels = [	"Used Storage",
							"Total Storage"];
			var usedStorageCounts = [];
			var totalStorageCounts = [];
			result.quarters = quarters;
			result.labels = labels;
			result.counts = [];
			result.counts.push(usedStorageCounts);
			result.counts.push(totalStorageCounts);
			if(data && data.length >0){
				for(var i in data){
					var row = data[i];
					quarters.push(quartersRef[row.quarter] + " "+ row.year);
					usedStorageCounts.push(row.usedStorage);
					totalStorageCounts.push(row.totalStorage);
				}
			}
			result.quarters.reverse();  
			result.counts[0].reverse(); 
			result.counts[1].reverse();
			cb(null, result);		
		});
	};

	/*
		Implementation of getTotalCost REST API endpoint.
	*/
	Analytics.getQuarterlyTotalCost = function(quarterYear, dataCenterId, cb) {
		var quarterObj;
		if(quarterYear){
			quarterObj = parseQuarterInput(quarterYear);
			if(!quarterObj.isValid){
				cb(new Error("Invalid input for: quarterYear") , null);			
			}		
		}
		var connection = getConnection();
		connection.connect();
		var selectClause = "select quarter quarter, year year, ( sum(ifnull(fteCost,0)) + ( sum(ifnull(averageElectricityUsage,0)) * ifnull(costperkWh,0) ) ) totalCost ";
		var fromClause = " from datacenterinformation ";
		var groupByClause = " group by quarter, year ";	
		var orderByClause = " order by year desc, quarter desc ";
		var whereClause = " where (year = "+ quarterObj.year 
							+ " and quarter <= "+ quarterObj.quarter 
							+ " ) or (year < "+ quarterObj.year + ") ";
		if(dataCenterId){
			whereClause = whereClause + " and dataCenterInventoryId = " + dataCenterId;
		}
		var limitClause = " LIMIT 4 ";
		var query = selectClause + fromClause + whereClause + groupByClause + orderByClause + limitClause;
		console.log("Query ::: "+ query);
		connection.query(query, function(err, rows, fields) {
			connection.end();
		  	if(err){
				cb(err, null);
			}
			var result = {};		
			var quarters = [];
			var totalCosts = [];
			for(var i in rows){
				quarters.push(quartersRef[rows[i].quarter] + " "+ rows[i].year);
				totalCosts.push(rows[i].totalCost);
			}
			result.quarters = quarters.reverse();
			result.totalCosts = totalCosts.reverse();
			cb(null, result);	 
		  	
		});
	};

	/*
		Implementation of getAllDataCenterCostAndElectricityUsageInfo REST API endpoint.
	*/
	Analytics.getAllDataCenterCostAndElectricityUsageInfo = function(quarterYear, cb) {
		var quarterObj;
		if(quarterYear){
			quarterObj = parseQuarterInput(quarterYear);
			if(!quarterObj.isValid){
				cb(new Error("Invalid input for: quarterYear") , null);			
			}		
		}
		var connection = getConnection();
		connection.connect();
		var selectClause = "select inv.dataCenterId dataCenterId, inv.dataCenterName, inv.city city, inv.state state, inf.averageElectricityUsage averageElectricityUsage, (ifnull(inf.fteCost,0) + ( ifnull(inf.averageElectricityUsage,0) * ifnull(inf.costperkWh,0))) totalCost, (ifnull(inf.totalWindowsServers,0)+ifnull(inf.totalUnixServers,0)+ifnull(inf.totalLinuxServers,0)+ifnull(inf.otherServers,0)) totalServers ";
		var fromClause = " from  datacenterinformation inf, datacenterinventory inv  ";
		var whereClause = " where inf.dataCenterInventoryId = inv.id and year = "+ quarterObj.year 
							+ " and quarter = "+ quarterObj.quarter;

		var query = selectClause + fromClause + whereClause;
		console.log("Query ::: "+ query);
		connection.query(query, function(err, rows, fields) {
			connection.end();
		  	if(err){
				cb(err, null);
			}
			var results = [];
			for(var i in rows){
				var result = {};
				result.dataCenterId = rows[i].dataCenterId;
				result.dataCenterName = rows[i].dataCenterName;
				result.totalCost = rows[i].totalCost / rows[i].totalServers;
				result.location = rows[i].city + ", " + rows[i].state;
				result.averageElectricityUsage = rows[i].averageElectricityUsage / rows[i].totalServers;
				results.push(result);
			}
			cb(null, results);	 
		  	
		});
	};

	/**
		Implementation of getQuarterlyElectricityUsage REST API endpoint.
	*/
	Analytics.getQuarterlyElectricityUsage = function(quarterYear, dataCenterId, cb) {	
		var quarterObj;
		if(quarterYear){
			quarterObj = parseQuarterInput(quarterYear);
			if(!quarterObj.isValid){
				cb(new Error("Invalid input for: quarterYear") , null);			
			}		
		}
		calculateQuarterlyTotals(quarterObj, dataCenterId, function(err, data){
			if(err){
				cb(err, null);
			}
			var result = {};
			var quarters = [];
			var electricityUsage = [];
			result.quarters = quarters;
			result.electricityUsage = electricityUsage;
			if(data && data.length >0){
				for(var i in data){
					var row = data[i];
					var counts = [];
					quarters.push(quartersRef[row.quarter] + " "+ row.year);
					electricityUsage.push(row.averageElectricityUsage);
				}
			}
			cb(null, result);		
		});
	};

	/**
		Implementation of getQuarterlyFTECost REST API endpoint.
	*/
	Analytics.getQuarterlyFTECost = function(quarterYear, dataCenterId, cb) {	
		var quarterObj;
		if(quarterYear){
			quarterObj = parseQuarterInput(quarterYear);
			if(!quarterObj.isValid){
				cb(new Error("Invalid input for: quarterYear") , null);			
			}		
		}
		calculateQuarterlyTotals(quarterObj, dataCenterId, function(err, data){
			if(err){
				cb(err, null);
			}
			var result = {};
			var quarters = [];
			var fteCost = [];
			result.quarters = quarters;
			result.fteCost = fteCost;
			if(data && data.length >0){
				for(var i in data){
					var row = data[i];
					var counts = [];
					quarters.push(quartersRef[row.quarter] + " "+ row.year);
					fteCost.push(row.fteCost);
				}
			}
			cb(null, result);		
		});
	};	
	//REST API Endpoint Configuration
 	Analytics.remoteMethod(
	'getQuarterlyDifferences',
		{
		  description: 'Fetches quarterly differences',
		  accepts: [{arg: 'quarterYear1', type: 'string', required: true},
		  		{arg: 'quarterYear2', type: 'string', required: true},
                {arg: 'dataCenterId', type: 'number', required: false}],
		  returns: {arg: 'results', type: 'object'},
		  http: {path: '/getQuarterlyDifferences', verb: 'get'}
		}
	);

 	Analytics.remoteMethod(
	'getQuarterlyStorageCounts',
		{
		  description: ['Fetches quarterly storage totals for the given quarterYear.'],
		  accepts: [{arg: 'quarterYear', type: 'string', required: false},
                {arg: 'dataCenterId', type: 'number', required: false}],
		  returns: {arg: 'results', type: 'object'},
		  http: {path: '/getQuarterlyStorageCounts', verb: 'get'}
		}
	);

	Analytics.remoteMethod(
	'getQuarterlyServerCounts',
		{
		  description: ['Fetches quarterly server totals for the given quarterYear.'],
		  accepts: [{arg: 'quarterYear', type: 'string', required: false},
                {arg: 'dataCenterId', type: 'number', required: false}],
		  returns: {arg: 'results', type: 'object'},
		  http: {path: '/getQuarterlyServerCounts', verb: 'get'}
		}
	);

	Analytics.remoteMethod(
	'getQuarterlyTotalCost',
		{
		  description: 'Fetches total cost for the last 4 quarters from the given quarter year',
		  accepts: [{arg: 'quarterYear', type: 'string', required: true},
                {arg: 'dataCenterId', type: 'number', required: false}],
		  returns: {arg: 'result', type: 'object'},
		  http: {path: '/getTotalCost', verb: 'get'}
		}
	);

	Analytics.remoteMethod(
	'getAllDataCenterCostAndElectricityUsageInfo',
		{
		  description: 'Fetches total cost and electricity for each data center for the given quarter',
		  accepts: [{arg: 'quarterYear', type: 'string', required: true}],
		  returns: {arg: 'result', type: 'array'},
		  http: {path: '/getAllDataCenterCostAndElectricityUsageInfo', verb: 'get'}
		}
	);

	Analytics.remoteMethod(
	'getQuarterlyElectricityUsage',
		{
		  description: ['Fetches quarterly total electricity usage for the given quarterYear.'],
		  accepts: [{arg: 'quarterYear', type: 'string', required: false},
                {arg: 'dataCenterId', type: 'number', required: false}],
		  returns: {arg: 'results', type: 'object'},
		  http: {path: '/getQuarterlyElectricityUsage', verb: 'get'}
		}
	);

	Analytics.remoteMethod(
	'getQuarterlyFTECost',
		{
		  description: ['Fetches quarterly total electricity usage for the given quarterYear.'],
		  accepts: [{arg: 'quarterYear', type: 'string', required: false},
                {arg: 'dataCenterId', type: 'number', required: false}],
		  returns: {arg: 'results', type: 'object'},
		  http: {path: '/getQuarterlyFTECost', verb: 'get'}
		}
	);	

};
