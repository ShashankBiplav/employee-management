const express = require('express');

const expressValidator = require('express-validator');

const adminController = require('../controllers/administrator');

const isAdmin = require('../middleware/is-admin');

const router = express.Router();

router.get('/employees', isAdmin,adminController.getAllEmployees);

router.get('/managers', isAdmin,adminController.getAllManagers);

router.get('/departments', isAdmin,adminController.getAllDepartments);

module.exports = router;

