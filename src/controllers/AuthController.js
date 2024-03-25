const UserModel = require("../models/userModel");
const { generateJWT } = require("../helpers/authHelpers/jwtHelper");
const { comparePassword } = require("../helpers/authHelpers/encryptHelper");

class AuthController{
    constructor(){}

    async login(req, res){
        try{
            const user = await UserModel.findOne({ email: req.body.email, state: true });
            if(user == null) return res.status(401).json({ message: "Email or Password is wrong" });
            if(!comparePassword(req.body.password, user.password)) return res.status(401).json({ message: "Email or Password is wrong" });
            const token = generateJWT({ userId: user._id });
            return res.status(200).json({
                user,
                token
            });
        }catch(error){
            return res.status(401).json({ message: "It is not possible allow the access" });
        }
    }
}

module.exports = AuthController;