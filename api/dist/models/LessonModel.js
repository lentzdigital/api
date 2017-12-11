'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LessonModel = new _mongoose2.default.Schema({
	_id: {
		type: Number,
		required: true
	},
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

exports.default = _mongoose2.default.model('Lesson', LessonModel);