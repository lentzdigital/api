'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _TrackModel = require('../models/TrackModel');

var _TrackModel2 = _interopRequireDefault(_TrackModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackController = function () {
	function TrackController() {
		_classCallCheck(this, TrackController);
	}

	_createClass(TrackController, null, [{
		key: 'newTrack',
		value: function newTrack(req, res, next) {
			var model = new _TrackModel2.default({
				'userId': req.body.userId,
				'lessonId': req.body.lessonId,
				'tracks': [{
					'start': req.body.start
				}]
			});

			model.save().then(function (savedTrack) {
				return res.json(savedTrack);
			}).catch(function (e) {
				return next(e);
			});
		}
	}, {
		key: 'updateTrack',
		value: function updateTrack(req, res, next) {
			var newTrack = {
				'start': req.body.start
			};

			_TrackModel2.default.findByIdAndUpdate(req.body.trackId, {
				$push: {
					'tracks': newTrack
				}
			}, {
				safe: true,
				upsert: true,
				new: true
			}, function (error, model) {
				if (error) console.log(error);
				res.json(model);
			});
		}
	}]);

	return TrackController;
}();

exports.default = TrackController;