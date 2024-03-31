const { PersonalDataModel, WorkExperienceModel } = require("../models");
class CurriculumVitaeController {
    constructor(){}

    async registerPersonalData(req, res){
        let personalData = { 
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            birthDate: req.body.birthDate,
            user: req.authUser,
            ...(req.body.maritalStatus && { maritalStatus: req.body.maritalStatus }),
            ...(req.body.nationality && { nationality: req.body.nationality }),
            contact: req.body.contact,
            ...(req.body.placeOfResidence && { placeOfResidence: req.body.placeOfResidence }),
            ...(req.body.aptitudes && { aptitudes: req.body.aptitudes })
        };

        if(req.body.professionalData){
            personalData = {
                ...personalData,
                professionalData: {
                    title: req.body.professionalData.title,
                    ...(req.body.professionalData.description && { description: req.body.professionalData.description })
                }
            };
        }

        try{
            console.log(personalData);
            const personalDataModel = new PersonalDataModel(personalData);
            await personalDataModel.save();
            return res.status(201).json({
                personalData: personalDataModel,
                message: "Personal data registered successfully"
            });
        }catch(error){
            return res.status(500).json({
                error,
                message: "It is not possible register data"
            });
        }
    }

    async registerWorkExperience(req, res){
        const workExperience = {
            position: req.body.position,
            company: req.body.company,
            city: req.body.city,
            startDate: req.body.startDate,
            user: req.authUser,
            ...(req.body.endDate && { endDate: req.body.endDate})
        };

        try{
            const workExperienceModel = new WorkExperienceModel(workExperience);
            await workExperienceModel.save();
            return res.status(201).json({
                workExperience: workExperienceModel,
                message: "Work experience registered successfully"
            });
        }catch(error){
            return res.status(500).json({
                error,
                message: "It is not possible register data"
            });
        }
    }
}

module.exports = CurriculumVitaeController;