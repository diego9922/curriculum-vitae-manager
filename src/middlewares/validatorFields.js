const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array()});
	}
	next();
}

const validateField = (req, res, next)=>{ //only return one message with the same structure that validateFields
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: [errors.array()[0]]});
	}
	next();
}

module.exports={ validateFields, validateField };