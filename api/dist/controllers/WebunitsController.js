'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _LessonModel = require('../models/LessonModel');

var _LessonModel2 = _interopRequireDefault(_LessonModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var staticGroupId = 2353;

var request = _axios2.default.create({
	'baseURL': 'https://api.webuntis.dk/api/',
	'headers': {
		'x-api-key': 'b4be51b712295d7e9dd122239a1826eb3d176a3d'
	}
});

var WebuntisController = function () {
	function WebuntisController() {
		_classCallCheck(this, WebuntisController);
	}

	_createClass(WebuntisController, null, [{
		key: 'sync',
		value: function sync() {
			request.get('groups/2353/lessons').then(function (response) {
				var lessonIds = [];

				response.data.map(function (item) {
					lessonIds.push(item.untis_id);
				});

				console.log('LessonIds in first then', lessonIds);
				return lessonIds;
			}).then(function (lessonIds) {
				var url = 'lessons?untis_ids=';

				lessonIds.map(function (item, i, arr) {
					if (i === arr.length - 1) {
						url += item;
					} else {
						url += item + ',';
					}
				});
				console.log('Url in second then', url);
				return url;
			}).then(function (url) {
				var data = void 0;

				request.get(url).then(function (response) {
					data = response;
					console.log('Data in second then', data);
					return data;
				}).catch(function (error) {
					console.log(error);
				});
			}).then(function (data) {
				console.log('Data in third then', data);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}]);

	return WebuntisController;
}();

exports.default = WebuntisController;