const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  confirmed: { type: Boolean, default: false },
  plusOne: { type: Number, default: 0 },
  dietaryRestrictions: { type: String, default: '' },
});

module.exports = mongoose.model('Guest', GuestSchema);