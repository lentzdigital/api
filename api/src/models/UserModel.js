import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	groupId: {
		type: Number,
		required: true
	}
});

export default mongoose.model('User', UserModel);