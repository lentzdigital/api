import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
	},
	passwordConf: {
		type: String,
		required: true,
	},
	groupId: {
		type: String,
		unique: true,
		required: true,
		trim: true
	}
});

export default mongoose.model('User', UserModel);