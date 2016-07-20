var mongoose = require('mongoose');

var SlotSchema = new mongoose.Schema({
	service_id: {type: mongoose.Schema.ObjectId, ref: 'ServiceSchema'},
	date: Date,
	price: Number,
	vacancies: { type: Number, default: 1 },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

SlotSchema.index({date : 1}, {unique: true});

module.exports = mongoose.model('Slot', SlotSchema);
