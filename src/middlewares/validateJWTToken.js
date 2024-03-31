const { validateJWT } = require('../helpers/authHelpers/jwtHelper');
const User = require('../models/userModel');

const validateJWTRequest = async(req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if(!token) return res.status(401).json({
		message: "There is not token in the request"
	});
	const validateToken = validateJWT(token);
	if(validateToken == false) return res.status(401).json({
		message: "Token no valid"
	});
	req.authUser = await User.findById(validateToken.userId);
	if(!req.authUser.state) return res.status(401).json({
		message: "Token no valid"
	});
	next();
};

module.exports = { validateJWTRequest }; 