const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true, 
    }
})

const model = new mongoose.Model('User', UserSchema);

module.exports = model;