const express = require("express");
const { check, body, param, query } = require("express-validator");
const { validateFields } = require("../middlewares/validatorFields");; 
const { isValidUserRole, isValidUserEmail } = require("../helpers/validatorHelpers/userValidatorHelper");
const AuthController = require("../controllers/AuthController");

const router = express.Router();
const authController = new AuthController();

router.post('/login', [
    body('email').not().isEmpty().withMessage("Email is required"),
    body('password').not().isEmpty().withMessage("Password is required"),
    validateFields
], authController.login);

module.exports = { path: '/auth', router };