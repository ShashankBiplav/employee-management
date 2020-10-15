const express = require('express');

const expressValidator = require('express-validator');

const adminController = require('../controllers/administrator');

const isAdmin = require('../middleware/is-admin');

const router = express.Router();

router.get('/employees', isAdmin, adminController.getAllEmployees);

router.get('/managers', isAdmin, adminController.getAllManagers);

router.get('/departments', isAdmin, adminController.getAllDepartments);

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

module.exports = router;
