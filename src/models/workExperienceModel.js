const { Schema, model } = require('mongoose');

const WorkExperienceSchema = Schema({
	position: {
		type: String,
		required: [true, 'Position is required']
	},
	company: {
		type: String,
		required: [true, 'Company is required']
	},
	city: {
		type: String,
	},
	startDate: {
		type: Date,
        required: [true, 'Start date is required']
	},
	endDate: {
		type: Date,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = model('WorkExperience', WorkExperienceSchema);