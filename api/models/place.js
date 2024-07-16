    const mongoose = require('mongoose');

    const placeSchema = new mongoose.Schema({
      Email:{ type: String, required: true },
      title: { type: String, required: true },
      address: { type: String, required: true },
      photos: [String],
      description: { type: String, required: true },
      perks: [String],
      extraInfo: String,  
      checkInTime: String,
      checkOutTime: String,
      maxGuests: Number,
      Price: Number,
    });

    const Place = mongoose.model('Place', placeSchema);

    module.exports = Place;
