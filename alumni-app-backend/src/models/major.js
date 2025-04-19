const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    unique: true
  },
  description: { 
    type: String 
  }
});

module.exports = mongoose.model('Major', majorSchema);