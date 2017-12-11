'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassModel = new _mongoose2.default.Schema({
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

exports.default = _mongoose2.default.model('Class', ClassModel);