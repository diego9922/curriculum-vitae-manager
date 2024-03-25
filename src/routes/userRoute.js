const express = require("express");
const { check, body, param, query } = require("express-validator");
const { validateFields } = require("../middlewares/validatorFields");; 
const { isValidUserRole, isValidUserEmail } = require("../helpers/validatorHelpers/userValidatorHelper");
const UserController = require("../controllers/UserController");

const router = express.Router();
const userController = new UserController();

router.post('/create-user', [
    body('name').not().isEmpty().withMessage("Name is required"),
    body('email').not().isEmpty().withMessage("Email is required"),
    body('email').isEmail().withMessage("Email is not valid"),
    body('email').custom(async(value)=>{
        if(!(await isValidUserEmail(value))) throw new Error("Email already exist");
    }),
    body('password').not().isEmpty().withMessage("Password is required"),
    body('role').custom(async(value)=>{
        if(!isValidUserRole(value)) throw new Error("Role is not valid");
    }),
    validateFields,
], userController.createUser);

module.exports = { path: '/user', router };