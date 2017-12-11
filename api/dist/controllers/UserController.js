'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
	function UserController() {
		_classCallCheck(this, UserController);
	}

	_createClass(UserController, null, [{
		key: 'create',
		value: function create(req, res, next) {
			var user = new _UserModel2.default({
				'username': req.body.username,
				'password': req.body.password,
				'groupdId': req.body.groupdId
			});

			user.save().then(function (savedUser) {
				return res.json(savedUser);
			}).catch(function (e) {
				return next(e, user);
			});
		}
	}]);

	return UserController;
}();

exports.default = UserController;