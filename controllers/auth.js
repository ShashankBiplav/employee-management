const expressValidator = require('express-validator');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const Administrator = require('../models/administrator');

//Initializing SIB API
const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_AUTH_API_KEY;
// Configure API key authorization: partner-key
let partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = process.env.SIB_PARTNER_API_KEY;
let apiInstance = new SibApiV3Sdk.SMTPApi();

exports.administratorSignup = async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const preExistingAdmin = await Administrator.findOne({email: email});
    if (preExistingAdmin) {
        const error = new Error('Admin with this email already exists');
        error.statusCode = 422;
        return next(error);
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 12);
        const admin = new Administrator({
            email: email,
            password: hashedPwd,
            name: name
        });
        const result = await admin.save();
        res.status(201).json({
            message: 'Admin Created',
            userId: result._id
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.administratorLogin = async (req, res, next) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const email = req.body.email;
    const password = req.body.password;
    let loadedAdmin;
    try {
        const admin = await Administrator.findOne({email: email});
        if (!admin) {
            const error = new Error('Admin with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        loadedAdmin = admin;
        const isPwdEqual = await bcrypt.compare(password, admin.password);
        if (!isPwdEqual) {
            const error = new Error('Wrong Password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedAdmin.email,
            userId: loadedAdmin._id.toString()
        }, 'yoursuperdupersecretkeythatisknownonlytoyouandtheserver', {
            expiresIn: '24h'
        });
        res.status(200).json({
            token: token,
            userId: loadedAdmin._id.toString()
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getOTPforAdmin = async (req, res, next) => {
    const email = req.body.email;
    let loadedAdmin;
    let generatedOTP;
    try {
        const admin = await Administrator.findOne({email: email});
        if (!admin) {
            const error = new Error('Admin with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        loadedAdmin = admin;
        generatedOTP = generateOTP();
        admin.resetToken = generatedOTP;
        admin.resetTokenExpiryDate = Date.now() + 3600000;
        await admin.save();
        const data = await sendEmailToResetPassword(email, loadedAdmin.name, generatedOTP);
        res.status(200).json({
            message: 'OTP sent!',
            result: data
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.resetAdminPassword = async (req, res, next) => {
    const email = req.body.email;
    const oneTimePassword = req.body.otp;
    const password = req.body.password;
    try {
        const admin = await Administrator.findOne({
            resetToken: oneTimePassword,
            resetTokenExpiryDate: {
                $gt: Date.now()
            },
            email: email
        })
        if (!admin) {
            const error = new Error('Admin with this email doesn\'t exist');
            error.statusCode = 401;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        admin.password = hashedPassword;
        admin.resetToken = undefined;
        admin.resetTokenExpiryDate = undefined;
        const data =await admin.save();
        res.status(201).json({
            message: 'Password Updated!',
            result: data
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

//helper function to generate AlphaNumeric OTP 8 characters
const generateOTP = () => {
    const string = '0123456789';
    let OTP = '';
    const len = string.length;
    for (let i = 0; i < 5; i++) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
};

//helper function to send OTP via SIB
const sendEmailToResetPassword = async (email, name, resetOTP) => {
    const sendSmtpEmail = {
        to: [{
            email: email,
            name: name
        }],
        templateId: 5, //TODO: create your own template
        params: {
            EMAIL: email,
            RESETLINK: `${resetOTP}`
        },
        subject: 'Reset Password OTP'
    };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API call successful. Email Sent. Returned data: ' + data);
    return data;
};

