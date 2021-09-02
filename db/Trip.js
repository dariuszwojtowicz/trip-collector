const mongoose = require('mongoose');

module.exports = mongoose.model('Trip', new mongoose.Schema({
  name: String
}));
