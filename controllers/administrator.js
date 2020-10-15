const fs = require('fs');

const Administrator = require('../models/administrator');

const Department = require('../models/department');

const Manager = require('../models/manager');

const Employee = require('../models/employee');

exports.getAllEmployees = async(req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    try{
        const totalEmployees = await Employee.find().countDocuments();
        const employees = await Employee.find().skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Employees fetched successfully',
            data: {
                totalEmployees: totalEmployees,
                employees: employees
            }
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllManagers = async(req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    try{
        const totalManagers = await Manager.find().countDocuments();
        const managers = await Employee.find().skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Managers fetched successfully',
            data: {
                totalManagers: totalManagers,
                managers: managers
            }
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllDepartments = async (req, res, next) => {
    try{
        const departments = await Department.find().populate('employees manager');
        res.status(200).json({
            message: 'Departments fetched successfully',
            departments: departments
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
