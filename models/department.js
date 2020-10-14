const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    employees: [{
        type: Schema.Types.ObjectID,
        ref: 'Employee'
    }]
    ,
    manager: {
        type: Schema.Types.ObjectID,
        ref: 'Manager'
    },
});

module.exports = mongoose.model('Department', departmentSchema);


