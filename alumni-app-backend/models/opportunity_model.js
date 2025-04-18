const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    posted_by:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ['Internship', 'Job', 'Volunteer', 'Co-op', 'Other']
    },
    needs_approval:{
        type: Boolean,
        default: true,
    },
    approved:{
        type: Boolean,
        default: false,
    },
    approved_by:{
        type: String,
        required: true
    },
    is_paid:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Opportunity', opportunitySchema);