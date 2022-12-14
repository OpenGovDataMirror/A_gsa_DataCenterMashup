var loopback = require('loopback');
module.exports = function(DataCenterInformation) {
	/*
		validate Quarter
	*/
	DataCenterInformation.observe('before save', function validateDataCenterInventoryId(ctx, next) {
	  	var dataCenterInventoryId;
		if(ctx.isNewInstance){
			dataCenterInventoryId = ctx.instance.dataCenterInventoryId;
		}else{
			dataCenterInventoryId = ctx.data.dataCenterInventoryId;
		}
		if(!dataCenterInventoryId){
			next(new Error("DataCenterInventoryId is required."));
		}else{
			loopback.findModel('DataCenterInventory').findById(dataCenterInventoryId, function(err, inventory){
				if(err){
					next(err);
				}
				if(inventory && inventory.id ){
					next();			
				}else{
					next(new Error("Invalid DataCenterInventoryId."));
				}
			});
		}
	});

		/*
		validate Year
	*/
	DataCenterInformation.observe('before save', function validateYear(ctx, next) {
	  	var year;
		if(ctx.isNewInstance){
			year = ctx.instance.year;
		}else{
			year = ctx.data.year;
		}
		if(!year){
			next(new Error("Year is required."));
		}else{
			next();
		}
	});

	/*
		validate Quarter
	*/
	DataCenterInformation.observe('before save', function validateQuarter(ctx, next) {
	  	var quarter;
		if(ctx.isNewInstance){
			quarter = ctx.instance.quarter;
		}else{
			quarter = ctx.data.quarter;
		}
		if(!quarter){
			next(new Error("Quarter is required."));
		}else{
			if(quarter<1 || quarter >4){
				next(new Error("Quarter must be one of [1,2,3,4]."));
			}else{
				next();
			}
		}
	});

	/*
		validate Quarter
	*/
	DataCenterInformation.observe('before save', function validateDataCenterYearQuarter(ctx, next) {
	  	var quarter;
	  	var year;
	  	var dataCenterInventoryId;
	  	var id =0;
		if(ctx.isNewInstance){
			dataCenterInventoryId = ctx.instance.dataCenterInventoryId;
			year = ctx.instance.year;
			quarter = ctx.instance.quarter;
		}else{
			dataCenterInventoryId = ctx.data.dataCenterInventoryId;
			year = ctx.data.year;
			quarter = ctx.data.quarter;
			id = ctx.data.id;
		}
		DataCenterInformation.find({where: {dataCenterInventoryId:dataCenterInventoryId,quarter:quarter,year:year}}, 
			function(err, informations){
				if(err){
					next(err);
				}
				if(informations && informations.length >0 ){
					if(informations[0].id != id){
						next(new Error("Information is duplicated for Data Center Id, Quarter and Year"));	
					}else{
						next();
					}				
				}else{
					next();
				}
		});
	});

	/*
		Set Create Date and Update Date
	*/
	DataCenterInformation.observe('before save', function setTimestamp(ctx, next) {
	  if(ctx.isNewInstance){
	  	 ctx.instance.createdDt = new Date();
	  	 ctx.instance.updatedDt = new Date();
	  }else{
	  	 ctx.data.updatedDt = new Date();
	  }
	  next();
	});

};
