const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    password: {
        type: String,
        required: [true, "can't be blank"],
        minLength: [8, 'too short'],
    },
    fullName: {
        type: String,
        required: [true, "can't be blank"],
        maxLength: [100, 'too long'],
    },
    books: {
        type: Array,
        default: [],
    },
    role: { 
        type: String, 
        default: 'user' 
    },
});

module.exports = mongoose.model('User', UserSchema);