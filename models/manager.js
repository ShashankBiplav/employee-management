const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({
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
    department: {
        type: Schema.Types.ObjectID,
        ref: 'Department'
    },
    employees: [{
        type: Schema.Types.ObjectID,
        ref: 'Employee'
    }],
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

module.exports = mongoose.model('Manager', managerSchema);

