/**
 * AccidentsController
 *
 * @description :: Server-side logic for managing accidents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res, next) {
		var limit = req.param('limit') ? (req.param('limit') > 200 ? 200 : req.param('limit')) : 200,
		skip =  req.param('skip'),
		street = req.param('street') || null,
		crossRoad =  req.param('crossRoad') || null,
		type = req.param('type') || null,
		startDate = req.param('startDate') || null,
		endDate = req.param('endDate') || null,
		weekDay = req.param('weekDay') || null,
		injured = req.param('injured') || null,
		dead = req.param('dead') || null,
		transport = req.param('transport') || null,
		weather = req.param('weather'),
		year = req.param('year'),
		time = req.param('time'),
		latNw = req.param('latNw'),
		latSe = req.param('latSe'),
		lngNw = req.param('lngNw'),
		lngSe = req.param('lngSe'),
		region =req.param('region'),
		params = {},
		where = {};
		console.log(injured, dead);
		if(limit) { params.limit = (limit*1) };
		if(skip) { params.limit = (skip*1) };
		if(street) { 
			where.or = [
				{ LOG1: {'contains': street} },
				{ LOG2: {'contains': street} }
			];
		}

		if(crossRoad) {where.LOCAL = crossRoad;}
		if(type) {where.TIPO_ACID = type;}
		if(startDate) {where.DATA_HORA = {'>=': startDate};}
		if(endDate) {where.DATA_HORA = {'<=': endDate};}
		if(weekDay) {where.DIA_SEM = weekDay;}

		if(injured) {where.FERIDOS = {'!': ['0']};}
		if(dead) {where.FATAIS = {'!': ['0']};}
		if(transport) {
			var t = transport.split(',');

			for(var i=0, len=transport.length; i<len; i++) {
				where.or[transport[i]] = {'!': ['0']}
			}
		}

		if(weather) {where.TEMPO = weather;}
		if(year) {where.ANO = year.split(',');}
		if(time) {where.HORA = time.split(',');}
		console.log(latNw, latSe);
		if(latNw && latSe) {
			where.LATITUDE = {'<=': latNw, '>=': latSe};
		}
		
		if(lngNw && lngSe) {
			where.LONGITUDE = {'>=': lngNw, '>=': lngSe};
		}

		if(region) {where.REGIAO = region;}

		params.where = where;

		console.log(params);

		Accidents.find(params).exec(function (err, data) {
			if(err) {
				res.json({err: data});	
			} else {
				res.json(data);
			}
		});
	}
};

