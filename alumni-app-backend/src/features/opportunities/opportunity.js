import mongoose from 'mongoose';

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approval_date: {
        type: Date
    },
    is_paid:{
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Opportunity = mongoose.model('Opportunity', opportunitySchema);