var async = require('async');
var request = require('request');
var loopback = require('loopback');

module.exports = function(DataCenterInventory) {

	var GEOCODE_API = "http://www.mapquestapi.com/geocoding/v1/address?inFormat=json";

	/*
		validate Data Center Id
	*/
	DataCenterInventory.observe('before save', function validateDataCenterId(ctx, next) {
	  	var dataCenterId;
	  	var id = 0;
		if(ctx.isNewInstance){
			dataCenterId = ctx.instance.dataCenterId;
		}else{
			dataCenterId = ctx.data.dataCenterId;
			id = ctx.data.id;
		}
		if(!dataCenterId || dataCenterId.trim() == ""){
			next(new Error("Data Center ID is required."));
		}else{
			DataCenterInventory.find({where: {dataCenterId:dataCenterId}}, function(err, inventories){
				if(err){
					next(err);
				}
				if(inventories && inventories.length >0 ){
					if(inventories[0].id != id){
						next(new Error("Data Center ID is duplicated."));	
					}else{
						next();
					}				
				}else{
					next();
				}
			});
		}
	});

	/*
		Set Create Date and Update Date
	*/
	DataCenterInventory.observe('before save', function setTimestamp(ctx, next) {
		if(ctx.isNewInstance){
			 ctx.instance.createdDt = new Date();
			 ctx.instance.updatedDt = new Date();
		}else{
			 ctx.data.updatedDt = new Date();
		}
		next();
	});

	/*
		Populates coordinates for each location
	*/
	populateCoordinates = function(dataCenters, cb){
		var url = GEOCODE_API + "&key=3gsXGDHwAVTV94kqDrKyJMWcduowHsxS";
		async.each(dataCenters, 
			function(eachDataCenter, async_callback){
				var location = {};
				if(eachDataCenter.zipCode){
					location.postalCode = eachDataCenter.zipCode;
				}else{
					if(eachDataCenter.city){
						location.city = eachDataCenter.city;
					}
					if(eachDataCenter.state){
						location.state = eachDataCenter.state;
					}
				}
				var eachURL = url + "&location="+ JSON.stringify(location);
				//Check cache if not make rest call
				loopback.findModel('Lookup').findOne({where: {key:eachURL}}, function(err, lookup){
					if(err){
						async_callback(error);
					}else{
						if(lookup){
							var responseOBJ = JSON.parse(lookup.value);
							eachDataCenter.coord = responseOBJ.results[0].locations[0].latLng;							
							async_callback();
						}else{
							request(eachURL, function (error, response, body) {
								var responseOBJ = JSON.parse(body);
								if(error){
									async_callback(error);
								}else{
									loopback.findModel('Lookup').create({key:eachURL, value:body}, 
													function(err, obj){
										//console.log(obj);
										if(err){
											async_callback(error);											
										}else{
											eachDataCenter.coord = responseOBJ.results[0].locations[0].latLng;							
											async_callback();
										}

									});									
								}
							});
						}
					}
				});				
			},function(err){
				if(err){
					cb(err, null);
				}else{
					cb(null, dataCenters);
				}
			}
		);
	};

	/**
		Implementation of getDataCenters REST API endpoint.
	*/
	DataCenterInventory.getDataCenters = function(cb) {
	    this.find({}, function(err, inventories){
	      if (err) return cb(err);
	      var dataCenters = [];
	      for(var i in inventories){
	      	var dataCenter = {};
	      	dataCenter.id = inventories[i].id;
	      	dataCenter.dataCenterId = inventories[i].dataCenterId;
	      	dataCenter.name = inventories[i].publishedName;
	      	if( inventories[i].city && inventories[i].city !=""){
	      		dataCenter.city = inventories[i].city;
	      	}
	      	if(inventories[i].state && inventories[i].state != ""){
	      		dataCenter.state = inventories[i].state;
	      	}
	      	if(inventories[i].zipCode && inventories[i].zipCode != ""){
	      		dataCenter.zipCode = inventories[i].zipCode;
	      		dataCenter.zipCode = dataCenter.zipCode.replace('\t','');
	      	}
	      	if(inventories[i].country && inventories[i].country != ""){
	      		dataCenter.country = inventories[i].country;
	      	}
	      	dataCenter.area = inventories[i].grossFloorArea;
	      	dataCenters.push(dataCenter);
	      }
	      populateCoordinates(dataCenters,cb);
	      //return cb(null, dataCenters);
	    });
 	};

 	//REST API Endpoint Configuration
 	DataCenterInventory.remoteMethod(
	'getDataCenters',
		{
		  description: 'Fetch all data centers',
		  returns: {arg: 'dataCenters', type: 'array'},
		  http: {path: '/getDataCenters', verb: 'get'}
		}
	);
};
