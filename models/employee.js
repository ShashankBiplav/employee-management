const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    profileImageUrl: {
        type: String,
    },
    gender: {
        type: String,
    },
    currentPosition: {
        type: String
    },
    salary: {
        type: Number
    },
    departments: [{
        type: Schema.Types.ObjectID,
        ref: 'Department'
    }]
    ,
    manager: {
        type: Schema.Types.ObjectID,
        ref: 'Manager'
    },
    status: {
        type: String
    },
    dateOfJoining: {
        type: Date
    },
    dateOfLeaving: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);

