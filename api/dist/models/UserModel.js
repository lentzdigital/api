'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserModel = new _mongoose2.default.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	passwordConf: {
		type: String,
		required: true
	},
	groupId: {
		type: String,
		unique: true,
		required: true,
		trim: true
	}
});

exports.default = _mongoose2.default.model('User', UserModel);