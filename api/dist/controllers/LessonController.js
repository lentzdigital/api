'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _LessonModel = require('../models/LessonModel');

var _LessonModel2 = _interopRequireDefault(_LessonModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = _axios2.default.create({
	'baseURL': 'https://api.webuntis.dk/api/',
	'headers': {
		'x-api-key': 'b4be51b712295d7e9dd122239a1826eb3d176a3d'
	}
});

var LessonController = function () {
	function LessonController() {
		_classCallCheck(this, LessonController);
	}

	_createClass(LessonController, null, [{
		key: 'getSubjectName',
		value: function getSubjectName(id) {
			if (typeof id === 'undefined') {
				return Promise.resolve(null);
			}

			return new Promise(function (resolve, reject) {
				request.get('subjects/' + id).then(function (response) {
					resolve(response.data.longname);
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}, {
		key: 'getTeacherName',
		value: function getTeacherName(id) {
			if (typeof id === 'undefined') {
				return Promise.resolve(null);
			}

			return new Promise(function (resolve, reject) {
				request.get('teachers/' + id).then(function (response) {
					resolve(response.data.longname);
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}, {
		key: 'getLocationName',
		value: function getLocationName(id) {
			if (typeof id === 'undefined') {
				return Promise.resolve(null);
			}

			return new Promise(function (resolve, reject) {
				request.get('locations/' + id).then(function (response) {
					resolve(response.data.longname);
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}, {
		key: 'convertToString',
		value: function convertToString(array) {
			return new Promise(function (final_resolve, final_reject) {
				var lessons = [];

				array.map(function (item, i, arr) {
					lessons.push(new Promise(function (resolve, reject) {

						Promise.all([LessonController.getSubjectName(item.subjects[0]), LessonController.getTeacherName(item.teachers[0]), LessonController.getLocationName(item.locations[0])]).then(function (_ref) {
							var _ref2 = _slicedToArray(_ref, 3),
							    subject = _ref2[0],
							    teacher = _ref2[1],
							    location = _ref2[2];

							resolve({
								'groupId': 2353,
								'subject': subject,
								'teacher': teacher,
								'location': location,
								'start': item.start,
								'end': item.end
							});
						});
					}));
				});

				Promise.all(lessons).then(function (lessons_values) {
					return final_resolve(lessons_values);
				});
			});
		}
	}, {
		key: 'getLessonIds',
		value: function getLessonIds() {
			request.get('groups/2353/lessons').then(function (response) {
				var lessonIds = [];

				response.data.forEach(function (item) {
					lessonIds.push(item.untis_id);
				});

				return lessonIds;
			}).then(function (lessonIds) {
				var url = 'lessons?untis_ids=';

				lessonIds.forEach(function (item, index, array) {
					if (index === array.length - 1) {
						url += item;
					} else {
						url += item + ',';
					}
				});

				return url;
			}).then(function (url) {
				request.get(url).then(function (response) {
					LessonController.convertToString(response.data).then(function (lessons) {
						console.log(lessons, '----------- last operation');
						_LessonModel2.default.insertMany(lessons).then(function (insertedLessons) {
							return res.json(insertedLessons);
						}).catch(function (e) {
							return next(e);
						});
					});
				}).catch(function (error) {
					console.log(error);
				});
			}).catch(function (error) {
				console.log(error);
			});
		}
	}]);

	return LessonController;
}();

exports.default = LessonController;