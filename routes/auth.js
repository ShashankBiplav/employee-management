const express = require('express');

const expressValidator = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

//ADMINISTRATOR SIGNUP
router.post('/administrator/signup', [expressValidator.check('name').trim().not().isEmpty(),
    expressValidator.check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    expressValidator.check('password').trim().isLength({
        min: 10
    })
], authController.administratorSignup);

//ADMINISTRATOR LOGIN
router.post('/administrator/login', [expressValidator.check('email').isEmail().normalizeEmail()],
    authController.administratorLogin);

//get OTP to reset password
router.post('/administrator/get-otp', [expressValidator.check('email').isEmail().normalizeEmail()],
    authController.getOTPforAdmin);

//Reset password
router.post('/administrator/reset-password',[expressValidator.check('email').isEmail().normalizeEmail()],
    authController.resetAdminPassword);

module.exports = router;
