const { Schema, model } = require('mongoose');

const PersonalDataSchema = Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required']
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required']
	},
	birthDate: {
		type: Date,
		required: [true, 'Birthdate is required'],
	},
	maritalStatus: {
		type: String,
	},
	nationality: {
		type: String,
	},
	professionalData: {
		type: Map,
        of: String
	},
	contact: {
		type: Map,
        of: String
	},
	placeOfResidence:{
		type: Map,
		of: String
	},
    aptitudes: {
        type: [String]
    },
    user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		index: { unique: true }
	}
},
{
    timestamps: true
});

module.exports = model('PersonalData', PersonalDataSchema);