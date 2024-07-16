const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: String },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: Number,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

const bookingmodel = mongoose.model("booking", bookingSchema);

module.exports = bookingmodel;  