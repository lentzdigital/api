'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ClassModel = require('../models/ClassModel');

var _ClassModel2 = _interopRequireDefault(_ClassModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassController = function () {
	function ClassController() {
		_classCallCheck(this, ClassController);
	}

	_createClass(ClassController, null, [{
		key: 'create',
		value: function create(req, res, next) {
			var model = new _ClassModel2.default({
				'userId': parseInt(req.body.userId),
				'classId': parseInt(req.body.classId)
			});

			model.save().then(function (savedClass) {
				return res.json(savedClass);
			}).catch(function (e) {
				return next(e);
			});
		}
	}, {
		key: 'createMessage',
		value: function createMessage(req, res, next) {
			var message = {
				'message': req.body.message,
				'byAdmin': req.body.byAdmin
			};

			_ClassModel2.default.findOneAndUpdate({ '_id': req.params.id }, {
				$push: {
					messages: message
				}
			}, {
				safe: true,
				upsert: true
			}).then(function (updatedMessage) {
				return res.json(updatedMessage);
			}).catch(function (e) {
				return next(e);
			});
		}
	}, {
		key: 'createRecord',
		value: function createRecord(req, res, next) {
			var record = {
				'startedAt': req.body.message,
				'endedAt': req.body.byAdmin
			};

			_ClassModel2.default.findOneAndUpdate({ '_id': req.params.id }, {
				$push: {
					records: record
				}
			}, {
				safe: true,
				upsert: true
			}).then(function (updatedRecord) {
				return res.json(updatedRecord);
			}).catch(function (e) {
				return next(e);
			});
		}
	}]);

	return ClassController;
}();

// function create(req, res, next) {
// 	const model = new ClassModel({
// 		'userId': parseInt(req.body.userId),
// 		'classId': parseInt(req.body.classId)
// 	});

// 	model.save()
// 		.then(savedClass => res.json(savedClass))
// 		.catch(e => next(e));
// }

// function createMessage(req, res, next) {
// 	let message = {
// 		'message': req.body.message,
// 		'byAdmin': req.body.byAdmin
// 	};

// 	ClassModel.findOneAndUpdate({'_id': req.params.id}, {
// 		$push: {
// 			messages: message
// 		}
// 	}, {
// 		safe: true, 
// 		upsert: true
// 	})
// 	.then(updatedMessage => res.json(updatedMessage))
// 	.catch(e => next(e));
// }

// function createRecord(req, res, next) {
// 	let record = {
// 		'startedAt': req.body.message,
// 		'endedAt': req.body.byAdmin
// 	};

// 	ClassModel.findOneAndUpdate({'_id': req.params.id}, {
// 		$push: {
// 			records: record
// 		}
// 	}, {
// 		safe: true, 
// 		upsert: true
// 	})
// 	.then(updatedRecord => res.json(updatedRecord))
// 	.catch(e => next(e));
// }

// export default {
// 	create,
// 	createMessage
// };


exports.default = ClassController;