var mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
	slot_id: {type: mongoose.Schema.ObjectId, ref: 'SlotSchema'},
	customer: {
		firstName: { type: String, trim: true },
		lastName: { type: String, trim: true },
		age: Number,
		weight: Number,
		gender: { type: String, trim: true, lowercase: true, default: 'male' },
		chp: String,
		email: { type: String, trim: true, lowercase: true }
	},
	price: Number,
	quantity: Number,
	total: Number,
	cupomCode: String,
	state: { type: String, trim: true, lowercase: true, default: 'new' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
