const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const administratorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    resetToken:{
        type: String
    },
    resetTokenExpiryDate:{
        type: Date
    }
});

module.exports = mongoose.model('Administrator', administratorSchema);
