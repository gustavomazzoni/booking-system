var router = require('express').Router({mergeParams: true});
var mongoose = require('mongoose');
var Slot = require('../../../models/Slot.js');

/* GET /api/v1/services/:serviceId/availability/dates/:date?quantity
	return all dates from a year-month that have available slots for a specific service
*/
router.get('/dates/:date', function(req, res, next) {
	console.log('Getting all dates from '+req.params.date+' that have available slots for '+req.query.quantity+' people for service id: '+req.params.serviceId);

	if (/^\d{4}-\d{1,2}/.test(req.params.date)) {
		var date = req.params.date.split('-');
		start = new Date(date[0], date[1] - 1, 1);
		var end = new Date(req.params.date);
		end = new Date(end.getUTCFullYear(), start.getUTCMonth()+1, 1);
	} else {
		return next(new Error('Invalid date param. It should be in YYYY-MM format.'));
	}
	

	// TODO: Return only dates from today

	var quantity = req.query.quantity || 1;
	
	// Any slot available with date greater than this month and less than the next month
	Slot.aggregate([
		// Filtering pipeline
		{ $match: { 
			service_id: mongoose.Types.ObjectId(req.params.serviceId), 
			vacancies: {$gte: (+quantity)}, 
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

/* GET /api/v1/services/:serviceId/availability/slots?date&quantity
	return all available slots from a date for a specific service
*/
router.get('/slots', function(req, res, next) {
	console.log('Getting slots availables for '+req.query.quantity+' people at '+req.query.date+' for service id: '+req.params.serviceId);

	if (/^\d{4}-\d{1,2}-\d{1,2}/.test(req.query.date)) {
		var start = new Date(req.query.date);
		var end = new Date(req.query.date);
		end.setDate(end.getDate() + 1);
	} else {
		return next(new Error('Invalid date param. It should be in YYYY-MM-DD format.'));
	}

	var quantity = req.query.quantity || 1;

	// Match same date without time
	Slot.find({
		service_id: req.params.serviceId, 
		vacancies: {$gte: (+quantity)}, 
		date: {$gte: start, $lt: end} 
	}).exec( function (err, list) {
		if (err) return next(err);
		res.json(list);
	});
});

/*  "/api/v1/services/:serviceId/slots/:id"
 *    GET: 
 */
// router.get('/:id', function(req, res, next) {
//   Slot.findById(req.params.id, function (err, result) {
//     if (err) return next(err);
//     res.json(result);
//   });
// });

module.exports = router;

