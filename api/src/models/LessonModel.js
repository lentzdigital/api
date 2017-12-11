import mongoose from 'mongoose';

const LessonModel = new mongoose.Schema({
	groupId: {
		type: Number,
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	teacher: {
		type: String
	},
	location: {
		type: String
	},
	start: {
		type: Date,
		required: true
	},
	end: {
		type: Date,
		required: true
	}
});

export default mongoose.model('Lesson', LessonModel);