const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	role: {
		type: String,
		required: true,
		enum: process.env.USER_ROLES.split(",").map(role => role.trim())
	},
	state: {
		type: Boolean,
		default: true
	}
},{
    timestamps: true
});

UserSchema.methods.toJSON = function(){
	// se extrae la version y la contraseña de la transformación a JSON para no retornarla
	const { __v, password, ...user } = this.toObject();
	return user;
}

module.exports = model('User', UserSchema);