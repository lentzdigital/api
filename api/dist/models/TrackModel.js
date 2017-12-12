'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TrackModel = new _mongoose2.default.Schema({
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

exports.default = _mongoose2.default.model('Track', TrackModel);