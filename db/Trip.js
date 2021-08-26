const mongoose = require('mongoose');

const Trip = mongoose.model('Trips', mongoose.Schema({
  name: String
}));

module.exports = Trip;
