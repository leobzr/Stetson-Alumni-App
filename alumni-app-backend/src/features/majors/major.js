import mongoose from 'mongoose';

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

export const Major = mongoose.model('Major', majorSchema);