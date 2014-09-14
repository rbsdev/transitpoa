/**
 * ImporterController
 *
 * @description :: Server-side logic for managing importers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res) {
		res.view({layout: 'importer/layout.ejs'});
	},

	import: function (req, res) {
		console.log(req.param('fileUrl'));
		var fs = require('fs'), 
		request = require('request'),
		MongoClient = require('mongodb').MongoClient,
		csvUrl = req.param('fileUrl'),
		// csvUrl = 'http://www.opendatapoa.com.br/storage/f/2013-11-08T12%3A32%3A00.175Z/acidentes-2012.csv',
		fileName = csvUrl.split('/').splice(-1)[0];
		console.log(csvUrl);
		console.log('Downloading File '  + fileName + '...');
		if (!fs.existsSync('csv/' + fileName)) {
			request(csvUrl, function () {
				//Converter Class
				var Converter=require("csvtojson").core.Converter;

				var csvFileName="csv/" + fileName;
				var fileStream=fs.createReadStream(csvFileName);
				//new converter instance
				var csvConverter=new Converter({constructResult:true, delimiter: ";"});
				//end_parsed will be emitted once parsing finished
				csvConverter.on("end_parsed",function (jsonObj) {
				   MongoClient.connect('mongodb://127.0.0.1:27017/transit', function(err, db) {
				   	if(err) throw err;
				   	
				   	var collection = db.collection('accidents'),
				   	count = 0;

				   	for(var i=0, len=jsonObj.length; i<len; i++) {
				   		var data = jsonObj[i];
				   		if(typeof(data.LATITUDE) === 'string') {
				   			if(data.LATITUDE.replace)
				   			data.LATITUDE = parseFloat(data.LATITUDE.replace(',','.'));
				   		}

				   		if(typeof(data.LONGITUDE) === 'string') {
				   			if(data.LONGITUDE)
				   			data.LONGITUDE = parseFloat(data.LONGITUDE.replace(',','.'));
				   		}
						// collection.update({ID: data.ID}, {$set: data}, {upsert: true}, function(err, docs) {
						collection.insert(data, function(err, docs) {
					    	// if(err) {console.log(err);}
					    	count++;
					    	if(count === (len-1)) { res.json({success: true, type: 1}); db.close(); }
					    });
					}
				  })
				});

				// read from file
				fileStream.pipe(csvConverter);

			}).pipe(fs.createWriteStream('csv/' + fileName));
		} else {
			res.json({success: true, type: 2});
		}
	}
};

