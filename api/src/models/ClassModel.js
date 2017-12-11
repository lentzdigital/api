import mongoose from 'mongoose';

const ClassModel = new mongoose.Schema({
	userId: {
		type: Number,
		required: true
	},
	classId: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	messages: [{
		message: {
			type: String
		},
		byAdmin: {
			type: Boolean
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	}],
	records: [{
		startedAt: {
			type: Date
		},
		endedAt: {
			type: Date
		}
	}]
});

export default mongoose.model('Class', ClassModel);