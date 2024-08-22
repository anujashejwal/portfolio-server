const mongoose = require('mongoose');

// Define the MessageSchema
const MessageSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    message: {
        type: String,
        required: true,
    }
}, {
    timestamps: true 
});

// Create and export the Message model
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
