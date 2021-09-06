const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: { type: String },
  state: { type: String },
  country: { type: String },
  id: { type: Number },
  coord: {
    lon: { type: Number },
    lat: { type: Number }
  }
});

module.exports = mongoose.model('City', CitySchema, 'cities');
