var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Slot = require('../models/Slot.js');

exports.addRoutes = function(app, config) {

	var resource = "/services/:idService/slots";

	/* GET /api/v1/services/:idService/slots/available/:quantity/dates/:year,:month 
		return all dates from a year-month that have available slots for a specific service
	*/
	router.get(resource + '/available/:quantity/dates/:year,:month', function(req, res, next) {
		console.log('Getting all dates from '+req.params.year+'-'+req.params.month+' that have available slots for '+req.params.quantity+' people for service id: '+req.params.idService);
		var start = new Date(req.params.year, req.params.month-1, 1);
		var end = new Date(req.params.year, req.params.month, 1);
		
		// Any slot available with date greater than this month and less than the next month
		Slot.aggregate([
			// Filtering pipeline
			{ $match: { 
				service_id: mongoose.Types.ObjectId(req.params.idService), 
				vacancies: {$gte: (+req.params.quantity)}, 
				date: {$gte: start, $lt: end} 
				} 
			},
			// Grouping pipeline
			{ $group: { 
				_id : { year: { $year: "$date" }, month: { $month: "$date" }, day: { $dayOfMonth: "$date" } },
				minPrice: { $min: '$price'}, 
				count: { $sum: 1 } 
				} 
			},
			// Sorting pipeline
        	{ $sort: { "_id.day": 1 } }
		]).exec( function (err, list) {
			if (err) return next(err);
			res.json(list);
		});
	});

	/* GET /api/v1/services/:idService/slots/available/:date,:quantity
		return all available slots from a date for a specific service
	*/
	router.get(resource + '/available/:date,:quantity', function(req, res, next) {
		console.log('Getting slots availables for '+req.params.quantity+' people at '+req.params.date+' for service id: '+req.params.idService);

		var start = new Date(req.params.date);
		var end = new Date(req.params.date);
		end.setDate(end.getDate() + 1);
	
		// Match same date without time
		Slot.find(
			{
				service_id: req.params.idService, 
				vacancies: {$gte: (+req.params.quantity)}, 
				date: {$gte: start, $lt: end} 
			}, function (err, list) {
			if (err) return next(err);
			res.json(list);
		});
	});

	/*  "/api/v1/services/:idService/slots/:id"
	 *    GET: 
	 */
	// router.get(resource+'/:id', function(req, res, next) {
	//   Slot.findById(req.params.id, function (err, result) {
	//     if (err) return next(err);
	//     res.json(result);
	//   });
	// });

	// Set Product resource to API v1
 	app.use(config.server.apiV1Url, router);
};
