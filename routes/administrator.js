const express = require('express');

const expressValidator = require('express-validator');

const adminController = require('../controllers/administrator');

const isAdmin = require('../middleware/is-admin');

const router = express.Router();

router.get('/employees', isAdmin, adminController.getAllEmployees);

router.get('/managers', isAdmin, adminController.getAllManagers);

router.get('/departments', isAdmin, adminController.getAllDepartments);

router.get('/employee/:employeeId', isAdmin, adminController.getEmployee);

router.get('/manager/:managerId', isAdmin, adminController.getManager);

router.get('/department/:departmentId', isAdmin, adminController.getDepartment);

router.post('/create-department',
    isAdmin,
    [expressValidator.check('name').trim().not().isEmpty()],
    adminController.createDepartment);

router.post('/create-employee',
    isAdmin,
    [expressValidator.check('name').trim().not().isEmpty(),
        expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
        expressValidator.check('age').trim().isNumeric().not().isEmpty()],
    adminController.createEmployee);

router.post('create-manager',
    isAdmin,
    [expressValidator.check('name').trim().not().isEmpty(),
        expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
        expressValidator.check('age').trim().isNumeric().not().isEmpty()],
    adminController.createManager);

router.put('/update-employee/:employeeId',
    isAdmin,
    [expressValidator.check('name').trim().not().isEmpty(),
        expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
        expressValidator.check('age').trim().isNumeric().not().isEmpty(),
        expressValidator.check('gender').trim().not().isEmpty(),
        expressValidator.check('currentPosition').trim().not().isEmpty(),
        expressValidator.check('salary').trim().isNumeric().not().isEmpty(),
        expressValidator.check('manager').trim().not().isEmpty(),
        expressValidator.check('status').trim().not().isEmpty()],
    adminController.updateEmployee);

router.put('/update-manager/:managerId',
    isAdmin,
    [expressValidator.check('name').trim().not().isEmpty(),
        expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
        expressValidator.check('age').trim().isNumeric().not().isEmpty(),
        expressValidator.check('gender').trim().not().isEmpty(),
        expressValidator.check('currentPosition').trim().not().isEmpty(),
        expressValidator.check('salary').trim().isNumeric().not().isEmpty(),
        expressValidator.check('department').trim().not().isEmpty(),
        expressValidator.check('status').trim().not().isEmpty()],
    adminController.updateManager);

router.put('/assign-manager/:employeeId',
    isAdmin,
    [expressValidator.check('managerId').trim().not().isEmpty()],
    adminController.assignNewManagerToEmployee);

router.put('/assign-employee-new-department/:employeeId',
    isAdmin,
    [expressValidator.check('departmentId').trim().not().isEmpty()],
    adminController.assignEmployeeToAnewDepartment);

router.put('/remove-employee-from-department/:employeeId',
    isAdmin,
    [expressValidator.check('departmentId').trim().not().isEmpty()],
    adminController.removeEmployeeFromADepartment);

router.delete('/delete-employee/:employeeId', isAdmin, adminController.deleteEmployee);

router.delete('/delete-manager/:managerId', isAdmin, adminController.deleteManager);

router.delete('/delete-department/:departmentId', isAdmin, adminController.deleteDepartment);

module.exports = router;
