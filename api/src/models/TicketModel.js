import mongoose from 'mongoose';

const TicketModel = new mongoose.Schema({
	userId: {
		type: Number,
		required: true
	},
	lessonId: {
		type: Number,
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	messages: [{
		message: {
			type: String,
			required: true
		},
		fromAdmin: {
			type: Boolean,
			default: false
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

export default mongoose.model('Ticket', TicketModel);