const express = require("express");
const { body, param, query } = require("express-validator");
const { validateJWTRequest } = require("../middlewares/validateJWTToken");
const { validateFields } = require("../middlewares/validatorFields");; 
const CurriculumVitaeController = require("../controllers/CurriculumVitaeController");

const router = express.Router();
const curriculumVitaeController = new CurriculumVitaeController();
router.post(
    "/personal-data", 
    [
        validateJWTRequest,
        body('firstName').not().isEmpty().withMessage("First name is required"),
        body('lastName').not().isEmpty().withMessage("Last name is required"),
        body('birthDate').isDate().withMessage("Birthdate is not valid"),
        body('maritalStatus').optional().not().isEmpty().withMessage("Marital status is not valid"),
        body('nacionality').optional().not().isEmpty().withMessage("Nacionality is not valid"),
        body('professionalData').optional().isObject().withMessage("Professional data is not valid"),
        body('professionalData.title').not().isEmpty().withMessage("Professional data tittle is required"),//@todo, if professionalData is defined then title must be declared
        body('professionalData.description').optional().not().isEmpty().withMessage("Professional data description is not valid"),
        body('contact').isObject().withMessage("Contact is not valid"),
        body('contact.email').isEmail().withMessage("Contact email is required"),
        body('contact.phone').not().isEmpty().withMessage("Contact phone is required"),
        body('placeOfResidence').optional().isObject().withMessage("Place of residence is not valid"),//@todo, if placeOfResidence is defined, must has any data (country, city or address)
        body('placeOfResidence.country').optional().not().isEmpty().withMessage("Residence address can not be null"),
        body('placeOfResidence.city').optional().not().isEmpty().withMessage("Residence address can not be null"),
        body('placeOfResidence.address').optional().not().isEmpty().withMessage("Residence address can not be null"),
        body('aptitudes').optional().isArray({ min: 1 }).withMessage("Aptitudes is not valid"),
        validateFields
    ],
    curriculumVitaeController.registerPersonalData
);

router.post(
    "/work-experience",
    [
        validateJWTRequest,
        body('position').not().isEmpty().withMessage("Position is required"),
        body('company').not().isEmpty().withMessage("Company is required"),
        body('city').not().isEmpty().withMessage("City is required"),
        body('startDate').isDate().withMessage("Start Date is not valid"),
        body('endDate').optional().isDate().withMessage("End Date is not valid"),
        validateFields
    ],
    curriculumVitaeController.registerWorkExperience
);

module.exports = { path: "/cv", router };