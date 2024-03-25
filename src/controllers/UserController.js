const UserModel = require("../models/userModel");
const { encryptPassword } = require("../helpers/authHelpers/encryptHelper");

class UserController{
    constructor(){}

    async createUser(req, res){
        console.log(req.body);
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: encryptPassword(req.body.password),
            role: req.body.role
        });
        try{
            await user.save();
            console.log({user});
            return res.status(201).json({
                message: "User created succesfully",
                user
            });
        }catch(error){
            console.error(error);
            res.status(400).json({
                message: "Error creating user",
                error
            });
        }
    }
}

module.exports = UserController;