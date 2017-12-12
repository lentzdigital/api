import mongoose from 'mongoose';

const TrackModel = new mongoose.Schema({
	userId: {
		type: Number,
		required: true
	},
	lessonId: {
		type: Number,
		required: true
	},
	tracks: [{
		start: {
			type: Date,
			required: true
		},
		end: {
			type: Date,
			default: Date.now
		}
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

export default mongoose.model('Track', TrackModel);