const fs = require('fs');

const Administrator = require('../models/administrator');

const expressValidator = require('express-validator');

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

exports.createDepartment = async(req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const name = req.body.name;
    const department = new Department({
        name: name
    });
    try{
        const result = await department.save();
        res.status(201).json({
            message: 'Department created successfully',
            result: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createEmployee = async(req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const {name, email, age} = req.body;
    const employee = new Employee({
        name: name,
        email: email,
        age: age
    });
    try{
        const result = await employee.save();
        res.status(201).json({
            message: 'Employee added to database successfully',
            result: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createManager = async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const {name, email, age} = req.body;
    const manager = new Manager({
        name: name,
        email: email,
        age: age
    });
    try{
        const result = await manager.save();
        res.status(201).json({
            message: 'Manager added to database successfully',
            result: result
        });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
