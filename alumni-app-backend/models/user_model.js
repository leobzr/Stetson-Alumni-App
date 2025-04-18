const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true,
        unique: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{ 
        type: String,
        required: true
    },
    year_graduated:{
        type: Number,
        required: true,
    },
    major:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    title:{
        type: String, 
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    linkedin_link:{
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('User', userSchema);