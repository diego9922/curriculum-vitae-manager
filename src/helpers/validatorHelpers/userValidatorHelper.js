const UserModel = require("../../models/userModel");

const isValidUserRole = (role)=>{
    const roles = process.env.USER_ROLES.split(",").map(role => role.trim());
    return roles.includes(role);
};

const isValidUserEmail = async (email)=>{
    const userModel = await UserModel.exists({ email });
    return userModel == null;
}

module.exports = { isValidUserRole, isValidUserEmail };