import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.'],
        minlength: [2, 'Your first name must be at least 2 characters.'],
        maxlength: [50, 'Your first name cannot be longer than 50 characters.'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
        minlength: [2, 'Your last name must be at least 2 characters.'],
        maxlength: [50, 'Your last name cannot be longer than 50 characters.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [4, 'Your password must be at least 4 characters.'],
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;