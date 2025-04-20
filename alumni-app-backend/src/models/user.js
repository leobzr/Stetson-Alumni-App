const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    password:{
        type: String,
        required: true
    },
    linkedin_link:{
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    is_approved:{
        type: Boolean,
        default: false
    },
    refresh_tokens: [String]
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', userSchema);