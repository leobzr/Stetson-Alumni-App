const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  requirements: { 
    type: String 
  },
  location: { 
    type: String, 
    required: true 
  },
  jobType: { 
    type: String, 
    required: true,
    enum: ['Full-time', 'Part-time', 'Internship', 'Contract']
  },
  contactEmail: { 
    type: String, 
    required: true 
  },
  salary: { 
    type: String 
  },
  postedBy: { 
    type: String, 
    required: true 
  },
  postedDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);