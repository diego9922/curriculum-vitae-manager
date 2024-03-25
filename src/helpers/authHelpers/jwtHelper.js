const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
	try{
		return jwt.sign(
			payload,
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: parseInt(process.env.JWT_EXPIRE_SECONDS)
			}
		);
	}catch(error){
		throw new Error(error);
	}
};

const validateJWT = (token)=>{
	try{
		return jwt.verify(token, process.env.JWT_SECRET_KEY);
	}catch(error){
		return false;
	}
};

module.exports = { generateJWT, validateJWT };