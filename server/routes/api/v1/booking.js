var router = require('express').Router();
var mongoose = require('mongoose');
var Booking = require('../../../models/Booking.js');
var Slot = require('../../../models/Slot.js');

/*  "/api/v1/bookings/:bookingId"
 *    GET: 
 */
router.get('/:bookingId', function(req, res, next) {
	console.log('Getting Booking registration of ID:', req.params.bookingId);
	Booking.findById(req.params.bookingId, function (err, result) {
		if (err) return next(err);
		res.json(result);
	});
});

/* POST /bookings */
router.post('/', function(req, res, next) {
	console.log('Creating Booking registration for:', req.body);
	// before creating Booking in db
	// update vacancies number of the slot booked

	var data = req.body.data;
	if (!data) return next(new Error('Invalid data. Booking object not found.'));
	if (!data.slot_id) return next(new Error('Invalid data. slot_id property not found.'));

	Slot.findById(data.slot_id, function (err, slot) {
		slot.vacancies -= data.quantity;
		console.log('Slot vacancies updating to', slot.vacancies);

		slot.save(function (err) {
			if (err) {
				console.log('Error when saving Slot', err);
				return next(err);
			}

			// slot saved, ready to create booking
			Booking.create(data, function (err, result) {
				if (err) {
					console.log('Error when creating Booking', err);
					return next(err);
				}
			    res.json(result);
			});
		});
	});
	


  
});

/* PUT /bookings/:bookingId */
// router.put('/:bookingId', function(req, res, next) {
//   Booking.findByIdAndUpdate(req.params.bookingId, req.body.data, function (err, result) {
//     if (err) return next(err);
//     res.json(result);
//   });
// });

module.exports = router;
