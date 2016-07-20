var mongoose = require('mongoose');

var ServiceSchema = new mongoose.Schema({
  name: { type: String, trim:true },
  description: { type: String, trim:true },
  photoUrl: { type: String, trim:true },
  duration: Number,
  priceBase: Number,
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

ServiceSchema.index({name : 1});

module.exports = mongoose.model('Service', ServiceSchema);