const mongoose = require('mongoose');

const mongoConnection = async() => {
	try{
		await mongoose.connect("mongodb://root:toor@mongo:27017");
		console.log('DB Connected');
	}catch(e){
		console.error(e);
		throw new Error('Error connecting to DB');
	}
};

module.exports = { mongoConnection };