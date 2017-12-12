'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TicketModel = new _mongoose2.default.Schema({
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

exports.default = _mongoose2.default.model('Ticket', TicketModel);