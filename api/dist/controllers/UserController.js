'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UserModel = require('../models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _auth = require('../config/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
	function UserController() {
		_classCallCheck(this, UserController);
	}

	_createClass(UserController, null, [{
		key: 'createNewUser',

		/**
   * Method for creating a new user
   * @param  {Object}   req  Request object, contains name, email, password and groupId
   * @param  {Object}   res  Response object, sends error or authentication
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
		value: function createNewUser(req, res, next) {
			var hash = _bcryptjs2.default.hashSync(req.body.password, 8);

			_UserModel2.default.create({
				'name': req.body.name,
				'email': req.body.email,
				'password': hash,
				'groupId': req.body.groupId
			}, function (error, user) {
				if (error) return res.status(500).send('There was a problem registering the user.');

				var token = _jsonwebtoken2.default.sign({ id: user._id }, _auth2.default.secret, {
					expiresIn: 86400
				});

				res.status(200).send({
					auth: true,
					token: token
				});
			});
		}

		/**
   * Verifies token
   * @param  {Object} req Request object, contains header with x-access-token set to user token
   * @param  {Object} res Response object, sends authentication or errors
   */

	}, {
		key: 'getToken',
		value: function getToken(req, res) {
			var token = req.headers['x-access-token'];

			if (!token) return res.status(401).send({
				auth: false,
				message: 'No token provided.'
			});

			_jsonwebtoken2.default.verify(token, _auth2.default.secret, function (err, decoded) {
				if (err) return res.status(500).send({
					auth: false,
					message: 'Failed to authenticate token.'
				});
				res.status(200).send(decoded);
			});
		}

		/**
   * Method for login. Validates with database by comparing hashed password & email.
   * @param  {Object} req Request object, should contain 
   *                  email and password in body, formatted as JSON
   * @param  {Object} res Response object, rejects or accepts user credentials.
   * @return {Object}     JSON object with either token, or permission denied.
   */

	}, {
		key: 'login',
		value: function login(req, res) {
			_UserModel2.default.findOne({ email: req.body.mail }, function (err, user) {
				if (err) return res.status(500).send('Error on the server.');
				if (!user) return res.status(404).send('No user found.');

				var passwordIsValid = _bcryptjs2.default.compareSync(req.body.pass, user.password);

				if (!passwordIsValid) return res.status(401).send({
					auth: false,
					token: null
				});

				var token = _jsonwebtoken2.default.sign({
					id: user._id
				}, _auth2.default.secret, {
					expiresIn: 86400
				});

				res.status(200).send({
					auth: true,
					token: token,
					userId: user._id
				});
			});
		}
	}]);

	return UserController;
}();

exports.default = UserController;