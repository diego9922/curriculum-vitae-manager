const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
	const salt = bcrypt.genSaltSync();
	return bcrypt.hashSync(password, salt);
};

const comparePassword = (password, savedPassword) => bcrypt.compareSync(password, savedPassword);

module.exports = { encryptPassword, comparePassword };