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

	addNews: function (req, res) {
		var news = [
			{	
				ID: "579254",
				TITLE: "Acidente mata adolescente de 15 anos e deixa duas feridas em Porto Alegre",
				SUBTITLE: "Um Corsa colidiu em uma Ecoesport após cruzar o sinal vermelho",
				IMAGES: ["http://gaucha.clicrbs.com.br/imagesrc/15868192.jpg?w=620&h=415&a=c&fr=true"],
				LINK: "http://gaucha.clicrbs.com.br/rs/noticia-aberta/acidente-mata-adolescente-de-15-anos-e-deixa-duas-feridas-em-porto-alegre-44360.html"
			},

			{
				ID: "581094",
				TITLE: "Motociclista de 17 anos morre em acidente na zona sul de Porto Alegre",
				SUBTITLE: "Adolescente conduzia veículo que colidiu contra um poste na Rua Coronel Massot",
				IMAGES: ["http://gaucha.clicrbs.com.br/imagesrc/15970195.jpg?w=620&h=415&a=c&fr=true"],
				LINK: "http://gaucha.clicrbs.com.br/rs/noticia-aberta/motociclista-de-17-anos-morre-em-acidente-na-zona-sul-de-porto-alegre-56520.html"
			},

			{
				ID: "580793",
				TITLE: "Acidente deixa feridos no bairro Cavalhada",
				SUBTITLE: "",
				IMAGES: ["https://pbs.twimg.com/media/BazntOXCMAAKp_J.jpg"],
				LINK: "http://gaucha.clicrbs.com.br/rs/noticia-aberta/acidente-deixa-feridos-no-bairro-cavalhada-54861.html"
			},

			{
				ID: "580288",
				TITLE: "Três pessoas ficam feridas em acidente no Bairro Azenha, em Porto Alegre",
				SUBTITLE: "",
				IMAGES: ["http://www.rbsdirect.com.br/imagesrc/15921684.jpg?w=640&h=480&fr=true", "http://www.rbsdirect.com.br/imagesrc/15921697.jpg?w=640&h=480&fr=true"],
				LINK: "http://gaucha.clicrbs.com.br/rs/noticia-aberta/tres-pessoas-ficam-feridas-em-acidente-no-bairro-azenha-em-porto-alegre-52921.html"
			},

			{
				ID: "579806",
				TITLE: "Menina de 11 anos morre após ser atropelada em Porto Alegre",
				SUBTITLE: "A vítima foi arremessada a uma distância de 15 metros.",
				IMAGES: [],
				LINK: "http://gaucha.clicrbs.com.br/rs/noticia-aberta/menina-de-11-anos-morre-apos-ser-atropelada-em-porto-alegre-48701.html"
			},

			{
				ID: "578881",
				TITLE: "Jovem de 22 anos morre após colidir moto contra poste em Porto Alegre",
				SUBTITLE: "",
				IMAGES: ["http://www.rbsdirect.com.br/imagesrc/15831702.jpg?w=640&h=480&fr=true", "http://www.rbsdirect.com.br/imagesrc/15831700.jpg?w=640&h=480&fr=true"],
				LINK: "http://gaucha.clicrbs.com.br/rs/noticia-aberta/jovem-de-22-anos-morre-apos-colidir-moto-contra-poste-em-porto-alegre-39862.html"
			},

			{
				ID: "578911",
				TITLE: "Homem morre após colidir carro contra poste, na zona Leste da Capital",
				SUBTITLE: "",
				IMAGES: ["http://gaucha.clicrbs.com.br/imagesrc/15837860.jpg?w=620&h=415&a=c&fr=true"],
				LINK: "http://gaucha.clicrbs.com.br/rs/noticia-aberta/homem-morre-apos-colidir-carro-contra-poste-na-zona-leste-da-capital-40561.html"
			},
		];

		var count = 0;

		for(var i=0, len=news.length; i<len; i++) {
			var n = news[i];
			Accidents.findOne({ID: n.ID}).exec(function (err, data) {
				if(data) {
					console.log('----', data);
					delete n.ID;
					console.log('----2', data);
					Accidents.update(data, {NEWS: n}, function (err, result) {
						console.log('err', result);
						count++;
						if(count === len) {
							res.json({sucess: true});
						}
					});
				}
			});
		}


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

