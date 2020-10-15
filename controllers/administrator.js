const fs = require('fs');

const Administrator = require('../models/administrator');

const expressValidator = require('express-validator');

const Department = require('../models/department');

const Manager = require('../models/manager');

const Employee = require('../models/employee');

exports.getAllEmployees = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    try {
        const totalEmployees = await Employee.find().countDocuments();
        const employees = await Employee.find().skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Employees fetched successfully',
            data: {
                totalEmployees: totalEmployees,
                employees: employees
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllManagers = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = 10;
    try {
        const totalManagers = await Manager.find().countDocuments();
        const managers = await Employee.find().skip((currentPage - 1) * perPage).limit(perPage);
        res.status(200).json({
            message: 'Managers fetched successfully',
            data: {
                totalManagers: totalManagers,
                managers: managers
            }
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getAllDepartments = async (req, res, next) => {
    try {
        const departments = await Department.find().populate('employees manager');
        res.status(200).json({
            message: 'Departments fetched successfully',
            departments: departments
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getEmployee = async (req, res, next) => {
    const employeeId = req.params.employeeId;
    try {
        const employee = await Employee.findById(employeeId).populate('manager', 'name email department');
        if (!employee) {
            const error = new Error('Employee not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Employee fetched successfully',
            employee: employee
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getManager = async (req, res, next) => {
    const managerId = req.params.managerId;
    try {
        const manager = await Manager.findById(managerId).populate('employees', 'name email departments');
        if (!manager) {
            const error = new Error('Manager not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Manager fetched successfully',
            manager: manager
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getDepartment = async (req, res, next) => {
    const departmentId = req.params.departmentId;
    try {
        const department = await Department.findById(departmentId).populate('employees manager', 'name');
        if (!department) {
            const error = new Error('Department not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Department fetched successfully',
            department: department
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createDepartment = async (req, res, next) => {
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
    try {
        const result = await department.save();
        res.status(201).json({
            message: 'Department created successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createEmployee = async (req, res, next) => {
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
        age: age,
        dateOfJoining: Date.now(),
    });
    try {
        const result = await employee.save();
        res.status(201).json({
            message: 'Employee added to database successfully',
            result: result
        });
    } catch (err) {
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
        age: age,
        dateOfJoining: Date.now(),
    });
    try {
        const result = await manager.save();
        res.status(201).json({
            message: 'Manager added to database successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateEmployee = async (req, res, next) => {
    const employeeId = req.params.employeeId;
    const {name, email, age, gender, currentPosition, salary, manager, status} = req.body;
    let profileImageUrl = req.body.image;
    if (req.file) {
        profileImageUrl = req.file.path; //filepath provided my multer
    }
    if (!profileImageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            const error = new Error('Employee not found');
            error.statusCode = 404;
            throw error;
        }
        if (profileImageUrl !== employee.profileImageUrl) { //new image was uploaded
            clearImage(employee.profileImageUrl);
        }
        employee.name = name;
        employee.email = email;
        employee.age = age;
        employee.gender = gender;
        employee.currentPosition = currentPosition;
        employee.salary = salary;
        employee.manager = manager;
        employee.status = status;
        employee.profileImageUrl = profileImageUrl;
        const result = await employee.save();
        res.status(201).json({
            message: 'Employee edited successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateManager = async (req, res, next) => {
    const managerId = req.params.managerId;
    ;
    const {name, email, age, gender, currentPosition, salary, departmentId, status} = req.body;
    let profileImageUrl = req.body.image;
    if (req.file) {
        profileImageUrl = req.file.path; //filepath provided my multer
    }
    if (!profileImageUrl) {
        const error = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }
    try {
        const manager = await Manager.findById(managerId);
        const department = await Department.findById(departmentId);
        if (!manager || !department) {
            const error = new Error('Manager not found');
            error.statusCode = 404;
            throw error;
        }
        if (profileImageUrl !== manager.profileImageUrl) { //new image was uploaded
            clearImage(manager.profileImageUrl);
        }
        manager.name = name;
        manager.email = email;
        manager.age = age;
        manager.gender = gender;
        manager.currentPosition = currentPosition;
        manager.salary = salary;
        manager.department = departmentId;
        manager.status = status;
        department.manager = manager._id;
        await department.save();
        const result = await manager.save();
        res.status(201).json({
            message: 'Manager edited successfully',
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.assignNewManagerToEmployee = async (req, res, next) => {
    const employeeId = req.params.employeeId;
    const managerId = req.body.managerId;
    try {
        const employee = await Employee.findById(employeeId);
        const manager = await Manager.findById(managerId);
        if (!employee || !manager) {
            const error = new Error('Manager or Employee not found');
            error.statusCode = 404;
            throw error;
        }
        employee.manager = managerId;
        const result = await employee.save();
        res.status(201).json({
            message: `New manager ${manager.name} assigned to ${employee.name} successfully`,
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.assignEmployeeToAnewDepartment = async (req, res, next) => {
    const employeeId = req.params.employeeId;
    const departmentId = req.body.departmentId;
    try {
        const employee = await Employee.findById(employeeId);
        const department = await Manager.findById(departmentId);
        if (!employee || !department) {
            const error = new Error('Department or Employee not found');
            error.statusCode = 404;
            throw error;
        }
        employee.departments.push(department);
        department.employees.push(employee);
        await department.save();
        const result = await employee.save();
        res.status(201).json({
            message: `New department ${department.name} assigned to ${employee.name} successfully`,
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.removeEmployeeFromADepartment = async (req, res, next) => {
    const employeeId = req.params.employeeId;
    const departmentId = req.body.departmentId;
    try {
        const employee = await Employee.findById(employeeId);
        const department = await Manager.findById(departmentId);
        if (!employee || !department) {
            const error = new Error('Department or Employee not found');
            error.statusCode = 404;
            throw error;
        }
        employee.departments.pull(department);
        department.employees.pull(employee);
        await department.save();
        const result = await employee.save();
        res.status(201).json({
            message: `Employee ${employee.name} removed from ${department.name} department  `,
            result: result
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteEmployee = async (req, res, next) => {
    const employeeId = req.params.employeeId;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            const error = new Error('Employee not found');
            error.statusCode = 404;
            throw error;
        }
        const manager = await Manager.findById(employee.manager.toString());
        manager.employees.pull(employee);
        clearImage(employee.profileImageUrl);
        for (const id of employee.departments) {
            const department = await Department.findById(id);
            department.employees.pull(employee);
            await department.save();
        }
        await Employee.findByIdAndRemove(employeeId);
        await manager.save();
        res.status(201).json({
            message: `Employee ${employee.name} deleted successfully `
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteManager = async (req, res, next) => {
    const managerId = req.params.managerId;
    try {
        const manager = await Manager.findById(managerId);
        if (!manager) {
            const error = new Error('Manager not found');
            error.statusCode = 404;
            throw error;
        }
        const department = await Department.findById(manager.department.toString());
        department.manager.pull(manager);
        clearImage(manager.profileImageUrl);
        for (const id of manager.employees) {
            const employee = await Employee.findById(id);
            employee.manager.pull(manager);
            await employee.save();
        }
        await Manager.findByIdAndRemove(managerId);
        await department.save();
        res.status(201).json({
            message: `Manager ${manager.name} deleted successfully `
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteDepartment = async (req, res, next) => {
    const departmentId = req.params.departmentId;
    try {
        const department = await Department.findById(departmentId);
        if (!department) {
            const error = new Error('Department not found');
            error.statusCode = 404;
            throw error;
        }
        const manager = await Manager.findById(department.manager.toString());
        manager.department.pull(department);
        for (const id of department.employees) {
            const employee = await Employee.findById(id);
            employee.departments.pull(department);
            await employee.save();
        }
        await Department.findByIdAndRemove(departmentId);
        await manager.save();
        res.status(201).json({
            message: `Department ${department.name} deleted successfully `
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//helper function to delete image
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
};

